import { NextResponse } from 'next/server';
import User from '@/models/User';
import connectDB from '@/lib/mongodb';

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
    }
  });
}

export async function POST(req: Request) {
  console.log('Verify endpoint çağrıldı');
  try {
    // Request body'i parse et
    let body;
    try {
      console.log('Request body parse ediliyor...');
      body = await req.json();
      console.log('Request body:', { 
        email: body.email, 
        code: body.code 
      });
    } catch (error) {
      console.error('Request body parse hatası:', error);
      return NextResponse.json(
        { error: 'Geçersiz istek formatı' },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true'
          }
        }
      );
    }

    const { email, code } = body;

    // Validasyon
    if (!email || !code) {
      console.log('Eksik alan hatası:', { email: !!email, code: !!code });
      return NextResponse.json(
        { error: 'Email ve doğrulama kodu zorunludur' },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true'
          }
        }
      );
    }

    // MongoDB bağlantısı
    console.log('MongoDB bağlantısı kuruluyor...');
    try {
      await connectDB();
      console.log('MongoDB bağlantısı başarılı');
    } catch (error) {
      console.error('MongoDB bağlantı hatası:', error);
      return NextResponse.json(
        { error: 'Veritabanı bağlantı hatası' },
        { 
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true'
          }
        }
      );
    }

    // Kullanıcıyı bul
    console.log('Kullanıcı aranıyor:', email);
    let user;
    try {
      user = await User.findOne({ 
        email,
        verificationCode: code,
        verificationCodeExpires: { $gt: new Date() }
      });

      if (!user) {
        console.log('Geçersiz doğrulama kodu veya süresi dolmuş');
        return NextResponse.json(
          { error: 'Geçersiz doğrulama kodu veya süresi dolmuş' },
          { 
            status: 400,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': 'true'
            }
          }
        );
      }

      if (user.isVerified) {
        console.log('Kullanıcı zaten doğrulanmış');
        return NextResponse.json(
          { message: 'Email adresi zaten doğrulanmış' },
          { 
            status: 200,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': 'true'
            }
          }
        );
      }

    } catch (error) {
      console.error('Kullanıcı arama hatası:', error);
      return NextResponse.json(
        { error: 'Doğrulama sırasında bir hata oluştu' },
        { 
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true'
          }
        }
      );
    }

    // Kullanıcıyı doğrulanmış olarak işaretle
    console.log('Kullanıcı doğrulanıyor...');
    try {
      user.isVerified = true;
      user.verificationCode = undefined;
      user.verificationCodeExpires = undefined;
      await user.save();
      console.log('Kullanıcı başarıyla doğrulandı');

      return NextResponse.json(
        { 
          message: 'Email adresi başarıyla doğrulandı',
          redirectUrl: '/auth/login'
        },
        { 
          status: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true'
          }
        }
      );

    } catch (error) {
      console.error('Kullanıcı güncelleme hatası:', error);
      return NextResponse.json(
        { error: 'Doğrulama sırasında bir hata oluştu' },
        { 
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true'
          }
        }
      );
    }

  } catch (error: any) {
    console.error('Genel doğrulama hatası:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return NextResponse.json(
      { error: 'Doğrulama sırasında bir hata oluştu' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true'
        }
      }
    );
  }
}
