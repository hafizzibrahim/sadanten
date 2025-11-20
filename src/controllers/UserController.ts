import { NextRequest, NextResponse } from 'next/server';
import UserService from '../services/UserService';
import { User } from '../models/User';

class UserController {
  async getAll(req: NextRequest) {
    try {
      const data = await UserService.getAllUsers();
      return NextResponse.json(data);
    } catch (error) {
      return new NextResponse('Internal Server Error', { status: 500 });
    }
  }

  async getById(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const data = await UserService.getUserById(parseInt(params.id, 10));
      if (!data) {
        return new NextResponse('Not Found', { status: 404 });
      }
      return NextResponse.json(data);
    } catch (error) {
      return new NextResponse('Internal Server Error', { status: 500 });
    }
  }

  async create(req: NextRequest) {
    try {
      const body: Omit<User, 'id' | 'createdAt' | 'updatedAt'> = await req.json();
      const data = await UserService.createUser(body);
      return NextResponse.json(data, { status: 201 });
    } catch (error) {
      return new NextResponse('Internal Server Error', { status: 500 });
    }
  }

  async update(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const body: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>> = await req.json();
      const data = await UserService.updateUser(parseInt(params.id, 10), body);
      return NextResponse.json(data);
    } catch (error) {
      return new NextResponse('Internal Server Error', { status: 500 });
    }
  }

  async delete(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      await UserService.deleteUser(parseInt(params.id, 10));
      return new NextResponse(null, { status: 204 });
    } catch (error) {
      return new NextResponse('Internal Server Error', { status: 500 });
    }
  }
}

export default new UserController();
