import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicDepartmentServices } from './academicDepartment.service';
import httpStatus from 'http-status';

const createAcademicDepartment = catchAsync(
    async (req: Request, res: Response) => {
        const result =
            await AcademicDepartmentServices.createAcademicDepartmentIntoDB(
                req.body,
            );
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Academic department is created successfully',
            data: result,
        });
    },
);

const getAllAcademicDepartments = catchAsync(
    async (req: Request, res: Response) => {
        const result =
            await AcademicDepartmentServices.getAllAcademicDepartmentsFromDB();
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Academic departments are retrieved successfully',
            data: result,
        });
    },
);

const getSingleAcademicDepartment = catchAsync(
    async (req: Request, res: Response) => {
        const { departmentId } = req.params;
        const result =
            await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(
                departmentId,
            );
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Academic department is retrieved successfully',
            data: result,
        });
    },
);

const updateAcademicDepartment = catchAsync(
    async (req: Request, res: Response) => {
        const { departmentId } = req.params;
        const result =
            await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(
                departmentId,
                req.body,
            );
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Academic department is updated successfully',
            data: result,
        });
    },
);

export const AcademicDepartmentControllers = {
    createAcademicDepartment,
    getAllAcademicDepartments,
    getSingleAcademicDepartment,
    updateAcademicDepartment,
};
