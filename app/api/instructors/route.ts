import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function GET() {
  try {
    await connectDB();

    // Sadece eğitmen rolüne sahip kullanıcıları getir
    const users = mongoose.connection.collection('users');
    const instructors = await users
      .find({ role: 'teacher' })
      .project({
        _id: 1,
        name: 1,
        email: 1,
        expertise: 1,
        title: 1,
        rating: 1,
        students: 1,
        courses: 1,
        image: 1
      })
      .toArray();

    return NextResponse.json(instructors);
  } catch (error) {
    console.error('Eğitmenler getirilirken hata:', error);
    return NextResponse.json(
      { error: 'Eğitmenler getirilirken bir hata oluştu' },
      { status: 500 }
    );
  }
}
