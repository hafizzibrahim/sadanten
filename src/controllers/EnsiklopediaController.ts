import { NextRequest, NextResponse } from 'next/server';
import EnsiklopediaService from '../services/EnsiklopediaService';
import { Ensiklopedia } from '../models/Ensiklopedia';

class EnsiklopediaController {
  async getAll(req: NextRequest) {
    try {
      const data = await EnsiklopediaService.getAllEnsiklopedia();
      return NextResponse.json(data);
    } catch (error) {
      return new NextResponse('Internal Server Error', { status: 500 });
    }
  }

  async getById(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const data = await EnsiklopediaService.getEnsiklopediaById(params.id);
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
      const body: Omit<Ensiklopedia, 'id' | 'created_at' | 'updated_at'> = await req.json();
      const data = await EnsiklopediaService.createEnsiklopedia(body);
      return NextResponse.json(data, { status: 201 });
    } catch (error) {
      return new NextResponse('Internal Server Error', { status: 500 });
    }
  }

  async update(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const body: Partial<Omit<Ensiklopedia, 'id' | 'created_at' | 'updated_at'>> = await req.json();
      const data = await EnsiklopediaService.updateEnsiklopedia(params.id, body);
      return NextResponse.json(data);
    } catch (error) {
      return new NextResponse('Internal Server Error', { status: 500 });
    }
  }

  async delete(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      await EnsiklopediaService.deleteEnsiklopedia(params.id);
      return new NextResponse(null, { status: 204 });
    } catch (error) {
      return new NextResponse('Internal Server Error', { status: 500 });
    }
  }
}

export default new EnsiklopediaController();
