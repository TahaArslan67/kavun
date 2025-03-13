import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import connectDB from '@/lib/mongodb';
import { generateVerificationCode, sendVerificationEmail } from '@/lib/mail';

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
  console.log('Register endpoint çağrıldı');
  try {
    // Request body'i parse et
    let body;
    try {
      console.log('Request body parse ediliyor...');
      body = await req.json();
      console.log('Request body:', { 
        name: body.name, 
        email: body.email, 
        password: '***'
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

    const { name, email, password } = body;

    // Validasyon
    if (!name || !email || !password) {
      console.log('Eksik alan hatası:', { name: !!name, email: !!email, password: !!password });
      return NextResponse.json(
        { error: 'Tüm alanlar zorunludur' },
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

    // Email kontrolü
    console.log('Email kontrolü yapılıyor...');
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log('Email zaten kayıtlı:', email);
        return NextResponse.json(
          { error: 'Bu email adresi zaten kayıtlı' },
          { 
            status: 400,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': 'true'
            }
          }
        );
      }
    } catch (error) {
      console.error('Email kontrol hatası:', error);
      return NextResponse.json(
        { error: 'Email kontrolü sırasında bir hata oluştu' },
        { 
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true'
          }
        }
      );
    }

    // Şifre hashleme
    console.log('Şifre hashleniyor...');
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      console.error('Şifre hashleme hatası:', error);
      return NextResponse.json(
        { error: 'Şifre işlenirken bir hata oluştu' },
        { 
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true'
          }
        }
      );
    }

    // Doğrulama kodu oluştur
    console.log('Doğrulama kodu oluşturuluyor...');
    const verificationCode = generateVerificationCode();
    const verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 dakika

    // Kullanıcı oluştur
    console.log('Kullanıcı oluşturuluyor...');
    let user;
    try {
      user = await User.create({
        name,
        email,
        password: hashedPassword,
        verificationCode,
        verificationCodeExpires,
        isVerified: false
      });
      console.log('Kullanıcı oluşturuldu:', user._id);
    } catch (error: any) {
      console.error('Kullanıcı oluşturma hatası:', error);
      if (error.code === 11000) {
        return NextResponse.json(
          { error: 'Bu email adresi zaten kayıtlı' },
          { 
            status: 400,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': 'true'
            }
          }
        );
      }
      return NextResponse.json(
        { error: 'Kullanıcı oluşturulurken bir hata oluştu' },
        { 
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true'
          }
        }
      );
    }

    // Doğrulama e-postası gönder
    console.log('Doğrulama e-postası gönderiliyor...');
    try {
      await sendVerificationEmail(email, verificationCode);
      console.log('Doğrulama e-postası gönderildi');
    } catch (error) {
      console.error('E-posta gönderme hatası:', error);
      // E-posta gönderilemese bile kullanıcı kaydını silmiyoruz
      // Kullanıcı daha sonra tekrar doğrulama e-postası isteyebilir
    }

    return NextResponse.json(
      { 
        message: 'Kayıt başarılı. Lütfen e-posta adresinizi doğrulayın.',
        redirectUrl: `/auth/verify?email=${encodeURIComponent(email)}`,
        email
      },
      { 
        status: 201,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true'
        }
      }
    );

  } catch (error: any) {
    console.error('Genel kayıt hatası:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return NextResponse.json(
      { error: 'Kayıt sırasında bir hata oluştu' },
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