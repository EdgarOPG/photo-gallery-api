import mongoose from 'mongoose';

export async function startConnection() {
    await mongoose.connect('mongodb://localhost/photo-gallery-db', {
        useNewUrlParser: true,
        useFindAndModify: false
    });
    console.log('Database is connected');
}

