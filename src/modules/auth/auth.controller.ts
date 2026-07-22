import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/ApiResponse';
import { registerSchema, loginSchema } from './auth.validator';
import { registerUser, loginUser } from './auth.service';
import { ApiError } from '../../utils/ApiError';

export const register = catchAsync(async (req: Request, res: Response) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ApiError(400, parsed.error.issues[0].message);
  }

  const { name, email, password } = parsed.data;
  const { user, token } = await registerUser(name, email, password);

  sendResponse(res, 201, 'User registered successfully', {
    user: { id: user.id, name: user.name, email: user.email },
    token,
  });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ApiError(400, parsed.error.issues[0].message);
  }

  const { email, password } = parsed.data;
  const { user, token } = await loginUser(email, password);

  sendResponse(res, 200, 'Login successful', { user, token });
});

export const getMe = catchAsync(async (req: Request, res: Response) => {
  sendResponse(res, 200, 'Current user fetched', req.user);
});