import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
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
  console.log('Login endpoint çağrıldı');
  try {
    // Request body'i parse et
    let body;
    try {
      console.log('Request body parse ediliyor...');
      body = await req.json();
      console.log('Request body:', { email: body.email, password: '***' });
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

    const { email, password } = body;

    // Validasyon
    if (!email || !password) {
      console.log('Eksik alan hatası:', { email: !!email, password: !!password });
      return NextResponse.json(
        { error: 'Email ve şifre zorunludur' },
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
      user = await User.findOne({ email }).select('+password');
      if (!user) {
        console.log('Kullanıcı bulunamadı:', email);
        return NextResponse.json(
          { error: 'Email veya şifre hatalı' },
          { 
            status: 401,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': 'true'
            }
          }
        );
      }

      // E-posta doğrulama kontrolü
      if (!user.isVerified) {
        console.log('Email doğrulanmamış:', email);
        return NextResponse.json(
          { 
            error: 'Lütfen önce email adresinizi doğrulayın',
            redirectUrl: `/auth/verify?email=${encodeURIComponent(email)}`
          },
          { 
            status: 403,
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
        { error: 'Kullanıcı arama sırasında bir hata oluştu' },
        { 
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true'
          }
        }
      );
    }

    // Şifre kontrolü
    console.log('Şifre kontrolü yapılıyor...');
    try {
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        console.log('Şifre hatalı');
        return NextResponse.json(
          { error: 'Email veya şifre hatalı' },
          { 
            status: 401,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': 'true'
            }
          }
        );
      }
    } catch (error) {
      console.error('Şifre karşılaştırma hatası:', error);
      return NextResponse.json(
        { error: 'Şifre kontrolü sırasında bir hata oluştu' },
        { 
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true'
          }
        }
      );
    }

    // JWT oluştur
    console.log('JWT token oluşturuluyor...');
    try {
      const token = await new SignJWT({ 
        userId: user._id.toString(),
        email: user.email,
        name: user.name
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('24h')
        .sign(new TextEncoder().encode(process.env.JWT_SECRET));

      console.log('Giriş başarılı:', { userId: user._id, email: user.email });
      
      const response = NextResponse.json(
        { 
          message: 'Giriş başarılı',
          redirectUrl: '/', // Anasayfaya yönlendir
          user: {
            id: user._id,
            name: user.name,
            email: user.email
          }
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true'
          }
        }
      );

      // JWT'yi httpOnly cookie olarak ayarla
      response.cookies.set({
        name: 'token',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 // 24 saat
      });

      return response;

    } catch (error) {
      console.error('JWT oluşturma hatası:', error);
      return NextResponse.json(
        { error: 'Oturum oluşturulurken bir hata oluştu' },
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
    console.error('Genel giriş hatası:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return NextResponse.json(
      { error: 'Giriş sırasında bir hata oluştu' },
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