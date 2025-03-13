import mongoose from 'mongoose';

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MongoDB URI bulunamadı. Lütfen .env dosyasını kontrol edin.');
}

let cached = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB() {
  if (cached.conn) {
    console.log('Mevcut MongoDB bağlantısı kullanılıyor');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('Yeni MongoDB bağlantısı oluşturuluyor...');
    // MONGODB_URI'nin varlığını zaten kontrol ettik, bu noktada kesinlikle string
    const uri = MONGODB_URI as string;
    console.log('Bağlantı URI:', uri.replace(/:[^:]*@/, ':****@')); // Şifreyi gizle

    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // 5 saniye timeout
      socketTimeoutMS: 45000, // 45 saniye socket timeout
      family: 4, // IPv4 kullan
    };

    cached.promise = mongoose.connect(uri, opts)
      .then((mongoose) => {
        console.log('MongoDB bağlantısı başarılı');
        mongoose.set('strictQuery', true);
        cached.conn = mongoose;
        return mongoose;
      })
      .catch((error) => {
        console.error('MongoDB bağlantı hatası:', {
          name: error.name,
          message: error.message,
          code: error.code
        });
        cached.promise = null;
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error: any) {
    cached.promise = null;
    console.error('MongoDB bağlantısı başarısız:', {
      name: error.name,
      message: error.message,
      code: error.code
    });
    throw new Error(`MongoDB bağlantı hatası: ${error.message}`);
  }

  return cached.conn;
}

export default connectDB;