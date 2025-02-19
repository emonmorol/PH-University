import mongoose, { model, Schema } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        academicFaculty: {
            type: Schema.Types.ObjectId,
            ref: 'AcademicFaculty',
        },
    },
    {
        timestamps: true,
    },
);


academicDepartmentSchema.pre('save', async function (next) {
    const isDepartmentExist = await AcademicDepartment.findOne({
        name: this.name,
    }).lean();

    if (isDepartmentExist) {
        return next(
            new AppError(
                httpStatus.CONFLICT,
                'This department already exists!',
            ),
        );
    }

    next();
});

// Pre-findOneAndUpdate hook for validation
academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
    const query = this.getQuery();

    // Check if _id exists and is a valid ObjectId
    if (query._id && !mongoose.Types.ObjectId.isValid(query._id)) {
        return next(new AppError(httpStatus.BAD_REQUEST, 'Invalid id format!'));
    }

    const isDepartmentExist = await this.model.findOne(query);

    if (!isDepartmentExist) {
        return next(
            new AppError(
                httpStatus.NOT_FOUND,
                'This department does not exist!',
            ),
        );
    }
});

export const AcademicDepartment = model<TAcademicDepartment>(
    'AcademicDepartment',
    academicDepartmentSchema,
);
