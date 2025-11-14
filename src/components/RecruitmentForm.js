'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaCheckCircle, FaTimesCircle, FaInstagram, FaWhatsapp, FaPhoneAlt, FaLock } from 'react-icons/fa';

const POSITIONS = ['Ketua', 'Sekretaris', 'Bendahara', 'Anggota'];
const IS_REGISTRATION_CLOSED = true;

export default function RecruitmentForm() {
    const [formData, setFormData] = useState({
        nama: '',
        noHP: '',
        kelasJurusan: '',
        alasanBergabung: '',
        pilihan1: '',
        alasanPilihan1: '',
        pilihan2: '',
        alasanPilihan2: '',
        pilihan3: '',
        alasanPilihan3: '',
        pilihan4: '',
        alasanPilihan4: '',
        pengetahuanTasis: '',
        followIG: '',
        joinWA: '',
    });

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const getAvailablePositions = (excludePositions = []) => {
        return POSITIONS.filter(pos => !excludePositions.includes(pos));
    };

    const handlePositionChange = (field, value) => {
        const newFormData = { ...formData, [field]: value };

        if (field === 'pilihan1') {
            if (newFormData.pilihan2 === value) {
                newFormData.pilihan2 = '';
                newFormData.alasanPilihan2 = '';
            }
            if (newFormData.pilihan3 === value) {
                newFormData.pilihan3 = '';
                newFormData.alasanPilihan3 = '';
            }
            if (newFormData.pilihan4 === value) {
                newFormData.pilihan4 = '';
                newFormData.alasanPilihan4 = '';
            }
        } else if (field === 'pilihan2') {
            if (newFormData.pilihan3 === value) {
                newFormData.pilihan3 = '';
                newFormData.alasanPilihan3 = '';
            }
            if (newFormData.pilihan4 === value) {
                newFormData.pilihan4 = '';
                newFormData.alasanPilihan4 = '';
            }
        } else if (field === 'pilihan3') {
            if (newFormData.pilihan4 === value) {
                newFormData.pilihan4 = '';
                newFormData.alasanPilihan4 = '';
            }
        }

        setFormData(newFormData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    timestamp: new Date().toISOString(),
                }),
            });

            const data = await response.json();

            if (data.success) {
                setSubmitted(true);
            } else {
                setError('Gagal mengirim data. Silakan coba lagi.');
            }
        } catch (err) {
            setError('Terjadi kesalahan. Silakan coba lagi.');
            console.error('Submit error:', err);
        } finally {
            setLoading(false);
        }
    };

    if (IS_REGISTRATION_CLOSED) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ backgroundColor: '#0d1216' }}>
                <div className="w-full max-w-2xl rounded-lg shadow-2xl p-8 md:p-12" style={{ backgroundColor: '#1a1f26', borderTop: '6px solid #ebae3b', border: '2px solid #ebae3b' }}>
                    <div className="text-center mb-8">
                        <div className="mb-6 flex justify-center">
                            <div className="relative">
                                <Image
                                    src="/logo.svg"
                                    alt="TASIS Logo"
                                    width={120}
                                    height={120}
                                    className="object-contain opacity-90"
                                />
                                <div className="absolute -top-2 -right-2 bg-red-600 rounded-full p-3 shadow-lg">
                                    <FaLock className="text-white text-xl" />
                                </div>
                            </div>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight" style={{ color: '#ebae3b', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            PENDAFTARAN DITUTUP
                        </h1>
                        <div className="mb-6 p-6 rounded-lg" style={{ backgroundColor: '#2a2f36', border: '2px solid #584928' }}>
                            <p className="text-lg sm:text-xl md:text-2xl font-bold mb-4" style={{ color: '#f2f3ff' }}>
                                Jadwal Selanjutnya:
                            </p>
                            <p className="text-2xl sm:text-3xl md:text-4xl font-black" style={{ color: '#ebae3b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                TEST WAWANCARA
                            </p>
                        </div>
                        <p className="text-sm sm:text-base font-medium" style={{ color: '#f2f3ff', opacity: 0.9 }}>
                            Terima kasih atas antusiasme kalian! 🎉<br />
                            Informasi lebih lanjut akan diumumkan segera.
                        </p>
                    </div>

                    <div className="space-y-4 mt-8">
                        <h2 className="text-xl font-black mb-4 tracking-tight text-center" style={{ color: '#ebae3b', textTransform: 'uppercase' }}>
                            Contact Person:
                        </h2>
                        <a
                            href="https://wa.me/6283107393837"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full p-3 sm:p-4 rounded-lg text-center font-bold sm:font-medium text-sm sm:text-base transition-all hover:shadow-md hover:opacity-90"
                            style={{ backgroundColor: '#ebae3b', color: '#0d1216' }}
                        >
                            <span className="inline-flex items-center gap-2">
                                <FaPhoneAlt />
                                Contact Person 1: 0831-0739-3837 (Abim)
                            </span>
                        </a>
                        <a
                            href="https://wa.me/6287898973388"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full p-3 sm:p-4 rounded-lg text-center font-bold sm:font-medium text-sm sm:text-base transition-all hover:shadow-md hover:opacity-90"
                            style={{ backgroundColor: '#ebae3b', color: '#0d1216' }}
                        >
                            <span className="inline-flex items-center gap-2">
                                <FaPhoneAlt />
                                Contact Person 2: 0878-9897-3388 (Rani)
                            </span>
                        </a>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-xs sm:text-sm font-semibold" style={{ color: '#584928' }}>
                            © 2025 TASIS - Tata Tertib Siswa
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (submitted) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#0d1216' }}>
                <div className="w-full max-w-2xl rounded-lg shadow-lg p-8 md:p-12" style={{ backgroundColor: '#1a1f26', borderTop: '4px solid #ebae3b' }}>
                    <div className="text-center mb-8">
                        <div className="mb-6 flex justify-center">
                            <Image
                                src="/logo.svg"
                                alt="TASIS Logo"
                                width={120}
                                height={120}
                                className="object-contain"
                            />
                        </div>
                        <h1 className="text-4xl font-black mb-4 tracking-tight" style={{ color: '#ebae3b', textTransform: 'uppercase' }}>
                            Terima Kasih!
                        </h1>
                        <p className="text-lg font-bold mb-6" style={{ color: '#f2f3ff' }}>
                            Pendaftaran Anda telah berhasil dikirim.
                        </p>
                    </div>

                    <div className="mb-8 p-4 rounded-lg" style={{ backgroundColor: '#2a2f36' }}>
                        <p className="text-sm mb-2" style={{ color: '#f2f3ff' }}>
                            <strong>Disclaimer:</strong> Data yang sudah kamu kirim tidak bisa diedit namun jika ingin mengirim lagi maka data terbaru yang akan dihitung dalam record.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl font-black mb-4 tracking-tight" style={{ color: '#ebae3b', textTransform: 'uppercase' }}>
                            Contact Person:
                        </h2>
                        <a
                            href="https://wa.me/6283107393837"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full p-3 sm:p-4 rounded-lg text-center font-bold sm:font-medium text-sm sm:text-base transition-all hover:shadow-md hover:opacity-90"
                            style={{ backgroundColor: '#ebae3b', color: '#0d1216' }}
                        >
                            <span className="inline-flex items-center gap-2">
                                <FaPhoneAlt />
                                Contact Person 1: 0831-0739-3837 (Abim)
                            </span>
                        </a>
                        <a
                            href="https://wa.me/6287898973388"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full p-3 sm:p-4 rounded-lg text-center font-bold sm:font-medium text-sm sm:text-base transition-all hover:shadow-md hover:opacity-90"
                            style={{ backgroundColor: '#ebae3b', color: '#0d1216' }}
                        >
                            <span className="inline-flex items-center gap-2">
                                <FaPhoneAlt />
                                Contact Person 2: 0878-9897-3388 (Rani)
                            </span>
                        </a>
                    </div>

                    <button
                        onClick={() => window.location.reload()}
                        className="mt-6 sm:mt-8 w-full p-3 rounded-lg font-bold sm:font-medium text-sm sm:text-base transition-all hover:opacity-90"
                        style={{ backgroundColor: '#3d321c', color: '#f2f3ff' }}
                    >
                        Kembali ke Form
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8 px-4" style={{ backgroundColor: '#0d1216' }}>
            <div className="max-w-2xl mx-auto rounded-lg shadow-lg p-6 md:p-10" style={{ backgroundColor: '#1a1f26', borderTop: '4px solid #ebae3b' }}>
                <div className="text-center mb-8">
                    <div className="mb-6 flex justify-center">
                        <Image
                            src="/logo.svg"
                            alt="TASIS Logo"
                            width={120}
                            height={120}
                            className="object-contain"
                        />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black mb-3 tracking-tight" style={{ color: '#ebae3b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Open Recruitment TASIS
                    </h1>
                    <h2 className="text-xl md:text-2xl font-bold" style={{ color: '#f2f3ff' }}>
                        Periode 2025/2026
                    </h2>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-lg bg-red-900 border border-red-700 text-red-200">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm sm:text-base font-bold mb-2 tracking-wide" style={{ color: '#f2f3ff', textTransform: 'uppercase', fontSize: 'clamp(0.75rem, 2vw, 0.875rem)', letterSpacing: '0.5px' }}>
                            Nama <span style={{ color: '#ebae3b' }}>*</span>
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.nama}
                            onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-600 font-medium text-sm sm:text-base"
                            style={{
                                backgroundColor: '#2a2f36',
                                color: '#f2f3ff',
                                borderColor: '#3d321c'
                            }}
                        />
                    </div>
                    <div>
                        <label className="block text-base font-bold mb-2 tracking-wide" style={{ color: '#f2f3ff', textTransform: 'uppercase', fontSize: '0.875rem', letterSpacing: '0.5px' }}>
                            No HP <span style={{ color: '#ebae3b' }}>*</span>
                        </label>
                        <input
                            type="tel"
                            required
                            placeholder="Ex: 08212345678xx"
                            value={formData.noHP}
                            onChange={(e) => setFormData({ ...formData, noHP: e.target.value })}
                            className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-600 font-medium"
                            style={{
                                backgroundColor: '#2a2f36',
                                color: '#f2f3ff',
                                borderColor: '#3d321c'
                            }}
                        />
                    </div>

                    <div>
                        <label className="block text-base font-bold mb-2 tracking-wide" style={{ color: '#f2f3ff', textTransform: 'uppercase', fontSize: '0.875rem', letterSpacing: '0.5px' }}>
                            Kelas Jurusan <span style={{ color: '#ebae3b' }}>*</span>
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="Ex: XII SIJA B"
                            value={formData.kelasJurusan}
                            onChange={(e) => setFormData({ ...formData, kelasJurusan: e.target.value })}
                            className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-600 font-medium"
                            style={{
                                backgroundColor: '#2a2f36',
                                color: '#f2f3ff',
                                borderColor: '#3d321c'
                            }}
                        />
                    </div>

                    <div>
                        <label className="block text-base font-bold mb-2 tracking-wide" style={{ color: '#f2f3ff', textTransform: 'uppercase', fontSize: '0.875rem', letterSpacing: '0.5px' }}>
                            Kenapa ingin bergabung dengan TASIS? <span style={{ color: '#ebae3b' }}>*</span>
                        </label>
                        <textarea
                            required
                            rows="4"
                            value={formData.alasanBergabung}
                            onChange={(e) => setFormData({ ...formData, alasanBergabung: e.target.value })}
                            className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-600 resize-none font-medium"
                            style={{
                                backgroundColor: '#2a2f36',
                                color: '#f2f3ff',
                                borderColor: '#3d321c'
                            }}
                        />
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                        <div>
                            <h3 className="text-base sm:text-lg md:text-xl font-black tracking-tight leading-tight" style={{ color: '#ebae3b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                Jabatan apa yang cocok sama kamu? <span style={{ color: '#f2f3ff' }}>*</span>
                            </h3>
                            <p className="text-xs sm:text-sm font-semibold mt-1 sm:mt-2" style={{ color: '#f2f3ff', opacity: 0.8 }}>
                                Pilih berdasarkan prioritas (1 = Paling Diinginkan)
                            </p>
                        </div>

                        <div className="p-3 sm:p-4 md:p-5 rounded-lg border-2" style={{ backgroundColor: '#2a2f36', borderColor: '#ebae3b' }}>
                            <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-black text-xs sm:text-sm shrink-0" style={{ backgroundColor: '#ebae3b', color: '#0d1216' }}>
                                    1
                                </div>
                                <label className="block text-xs sm:text-sm md:text-base font-bold tracking-wide" style={{ color: '#f2f3ff', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    Prioritas Pertama <span style={{ color: '#ebae3b' }}>*</span>
                                </label>
                            </div>
                            <select
                                required
                                value={formData.pilihan1}
                                onChange={(e) => handlePositionChange('pilihan1', e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-600 mb-3 sm:mb-4 font-bold text-sm sm:text-base"
                                style={{
                                    backgroundColor: '#1a1f26',
                                    color: '#f2f3ff',
                                    borderColor: '#584928'
                                }}
                            >
                                <option value="" style={{ color: '#999' }}>-- Pilih Jabatan --</option>
                                {getAvailablePositions().map((pos) => (
                                    <option key={pos} value={pos} style={{ backgroundColor: '#1a1f26', color: '#f2f3ff', fontWeight: 'bold' }}>{pos}</option>
                                ))}
                            </select>
                            <label className="block text-xs sm:text-sm font-bold mb-2 tracking-wide" style={{ color: '#f2f3ff', textTransform: 'uppercase' }}>
                                Alasan memilih jabatan tersebut <span style={{ color: '#ebae3b' }}>*</span>
                            </label>
                            <textarea
                                required
                                rows="3"
                                value={formData.alasanPilihan1}
                                onChange={(e) => setFormData({ ...formData, alasanPilihan1: e.target.value })}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-600 resize-none font-medium text-sm sm:text-base"
                                style={{
                                    backgroundColor: '#1a1f26',
                                    color: '#f2f3ff',
                                    borderColor: '#584928'
                                }}
                            />
                        </div>

                        <div className="p-5 rounded-lg border-2" style={{ backgroundColor: '#2a2f36', borderColor: '#584928' }}>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center font-black text-sm" style={{ backgroundColor: '#584928', color: '#f2f3ff' }}>
                                    2
                                </div>
                                <label className="block text-base font-bold tracking-wide" style={{ color: '#f2f3ff', textTransform: 'uppercase', fontSize: '0.875rem', letterSpacing: '0.5px' }}>
                                    Prioritas Kedua <span style={{ color: '#ebae3b' }}>*</span>
                                </label>
                            </div>
                            <select
                                required
                                value={formData.pilihan2}
                                onChange={(e) => handlePositionChange('pilihan2', e.target.value)}
                                className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-600 mb-4 font-bold text-base"
                                style={{
                                    backgroundColor: '#1a1f26',
                                    color: '#f2f3ff',
                                    borderColor: '#584928'
                                }}
                                disabled={!formData.pilihan1}
                            >
                                <option value="" style={{ color: '#999' }}>-- Pilih Jabatan --</option>
                                {getAvailablePositions([formData.pilihan1]).map((pos) => (
                                    <option key={pos} value={pos} style={{ backgroundColor: '#1a1f26', color: '#f2f3ff', fontWeight: 'bold' }}>{pos}</option>
                                ))}
                            </select>
                            <label className="block text-sm font-bold mb-2 tracking-wide" style={{ color: '#f2f3ff', textTransform: 'uppercase', fontSize: '0.8rem' }}>
                                Alasan memilih jabatan tersebut <span style={{ color: '#ebae3b' }}>*</span>
                            </label>
                            <textarea
                                required
                                rows="3"
                                value={formData.alasanPilihan2}
                                onChange={(e) => setFormData({ ...formData, alasanPilihan2: e.target.value })}
                                className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-600 resize-none font-medium"
                                style={{
                                    backgroundColor: '#1a1f26',
                                    color: '#f2f3ff',
                                    borderColor: '#584928'
                                }}
                                disabled={!formData.pilihan2}
                            />
                        </div>

                        <div className="p-5 rounded-lg border-2" style={{ backgroundColor: '#2a2f36', borderColor: '#3d321c' }}>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center font-black text-sm" style={{ backgroundColor: '#3d321c', color: '#f2f3ff' }}>
                                    3
                                </div>
                                <label className="block text-base font-bold tracking-wide" style={{ color: '#f2f3ff', textTransform: 'uppercase', fontSize: '0.875rem', letterSpacing: '0.5px' }}>
                                    Prioritas Ketiga <span style={{ color: '#ebae3b' }}>*</span>
                                </label>
                            </div>
                            <select
                                required
                                value={formData.pilihan3}
                                onChange={(e) => handlePositionChange('pilihan3', e.target.value)}
                                className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-600 mb-4 font-bold text-base"
                                style={{
                                    backgroundColor: '#1a1f26',
                                    color: '#f2f3ff',
                                    borderColor: '#3d321c'
                                }}
                                disabled={!formData.pilihan2}
                            >
                                <option value="" style={{ color: '#999' }}>-- Pilih Jabatan --</option>
                                {getAvailablePositions([formData.pilihan1, formData.pilihan2]).map((pos) => (
                                    <option key={pos} value={pos} style={{ backgroundColor: '#1a1f26', color: '#f2f3ff', fontWeight: 'bold' }}>{pos}</option>
                                ))}
                            </select>
                            <label className="block text-sm font-bold mb-2 tracking-wide" style={{ color: '#f2f3ff', textTransform: 'uppercase', fontSize: '0.8rem' }}>
                                Alasan memilih jabatan tersebut <span style={{ color: '#ebae3b' }}>*</span>
                            </label>
                            <textarea
                                required
                                rows="3"
                                value={formData.alasanPilihan3}
                                onChange={(e) => setFormData({ ...formData, alasanPilihan3: e.target.value })}
                                className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-600 resize-none font-medium"
                                style={{
                                    backgroundColor: '#1a1f26',
                                    color: '#f2f3ff',
                                    borderColor: '#3d321c'
                                }}
                                disabled={!formData.pilihan3}
                            />
                        </div>

                        <div className="p-5 rounded-lg border-2" style={{ backgroundColor: '#2a2f36', borderColor: '#2a2112' }}>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center font-black text-sm" style={{ backgroundColor: '#2a2112', color: '#f2f3ff' }}>
                                    4
                                </div>
                                <label className="block text-base font-bold tracking-wide" style={{ color: '#f2f3ff', textTransform: 'uppercase', fontSize: '0.875rem', letterSpacing: '0.5px' }}>
                                    Prioritas Keempat <span style={{ color: '#ebae3b' }}>*</span>
                                </label>
                            </div>
                            <select
                                required
                                value={formData.pilihan4}
                                onChange={(e) => handlePositionChange('pilihan4', e.target.value)}
                                className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-600 mb-4 font-bold text-base"
                                style={{
                                    backgroundColor: '#1a1f26',
                                    color: '#f2f3ff',
                                    borderColor: '#2a2112'
                                }}
                                disabled={!formData.pilihan3}
                            >
                                <option value="" style={{ color: '#999' }}>-- Pilih Jabatan --</option>
                                {getAvailablePositions([formData.pilihan1, formData.pilihan2, formData.pilihan3]).map((pos) => (
                                    <option key={pos} value={pos} style={{ backgroundColor: '#1a1f26', color: '#f2f3ff', fontWeight: 'bold' }}>{pos}</option>
                                ))}
                            </select>
                            <label className="block text-sm font-bold mb-2 tracking-wide" style={{ color: '#f2f3ff', textTransform: 'uppercase', fontSize: '0.8rem' }}>
                                Alasan memilih jabatan tersebut <span style={{ color: '#ebae3b' }}>*</span>
                            </label>
                            <textarea
                                required
                                rows="3"
                                value={formData.alasanPilihan4}
                                onChange={(e) => setFormData({ ...formData, alasanPilihan4: e.target.value })}
                                className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-600 resize-none font-medium"
                                style={{
                                    backgroundColor: '#1a1f26',
                                    color: '#f2f3ff',
                                    borderColor: '#2a2112'
                                }}
                                disabled={!formData.pilihan4}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-base font-bold mb-2 tracking-wide" style={{ color: '#f2f3ff', textTransform: 'uppercase', fontSize: '0.875rem', letterSpacing: '0.5px' }}>
                            Sejauh mana kamu tau tentang TASIS? <span style={{ color: '#ebae3b' }}>*</span>
                        </label>
                        <textarea
                            required
                            rows="4"
                            value={formData.pengetahuanTasis}
                            onChange={(e) => setFormData({ ...formData, pengetahuanTasis: e.target.value })}
                            className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-yellow-600 resize-none font-medium"
                            style={{
                                backgroundColor: '#2a2f36',
                                color: '#f2f3ff',
                                borderColor: '#3d321c'
                            }}
                        />
                    </div>

                    <div>
                        <label className="block text-sm sm:text-base font-bold mb-3 sm:mb-4 tracking-wide" style={{ color: '#f2f3ff', textTransform: 'uppercase', fontSize: 'clamp(0.75rem, 2vw, 0.875rem)', letterSpacing: '0.5px' }}>
                            Sudah follow IG TASIS? <span style={{ color: '#ebae3b' }}>*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            <label
                                className="relative cursor-pointer group"
                                style={{
                                    opacity: formData.followIG === 'Tidak' ? 0.6 : 1,
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <input
                                    type="radio"
                                    name="followIG"
                                    value="Ya"
                                    required
                                    checked={formData.followIG === 'Ya'}
                                    onChange={(e) => setFormData({ ...formData, followIG: e.target.value })}
                                    className="peer sr-only"
                                />
                                <div
                                    className="p-4 sm:p-5 rounded-xl border-3 text-center transition-all duration-300 peer-checked:scale-105 group-hover:scale-[1.02]"
                                    style={{
                                        borderColor: formData.followIG === 'Ya' ? '#ebae3b' : '#3d321c',
                                        backgroundColor: formData.followIG === 'Ya' ? '#2a2f36' : '#1a1f26',
                                        borderWidth: '3px',
                                        boxShadow: formData.followIG === 'Ya' ? '0 0 20px rgba(235, 174, 59, 0.3)' : 'none'
                                    }}
                                >
                                    <div className="text-3xl sm:text-4xl mb-2">
                                        <FaCheckCircle style={{ color: '#25D366', margin: '0 auto' }} />
                                    </div>
                                    <span className="font-black text-sm sm:text-base block" style={{ color: '#f2f3ff' }}>
                                        SUDAH
                                    </span>
                                    <span className="text-xs font-medium block mt-1" style={{ color: '#ebae3b' }}>
                                        Sudah Follow
                                    </span>
                                </div>
                            </label>

                            <label
                                className="relative cursor-pointer group"
                                style={{
                                    opacity: formData.followIG === 'Ya' ? 0.6 : 1,
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <input
                                    type="radio"
                                    name="followIG"
                                    value="Tidak"
                                    required
                                    checked={formData.followIG === 'Tidak'}
                                    onChange={(e) => setFormData({ ...formData, followIG: e.target.value })}
                                    className="peer sr-only"
                                />
                                <div
                                    className="p-4 sm:p-5 rounded-xl border-3 text-center transition-all duration-300 peer-checked:scale-105 group-hover:scale-[1.02]"
                                    style={{
                                        borderColor: formData.followIG === 'Tidak' ? '#ebae3b' : '#3d321c',
                                        backgroundColor: formData.followIG === 'Tidak' ? '#2a2f36' : '#1a1f26',
                                        borderWidth: '3px',
                                        boxShadow: formData.followIG === 'Tidak' ? '0 0 20px rgba(235, 174, 59, 0.3)' : 'none'
                                    }}
                                >
                                    <div className="text-3xl sm:text-4xl mb-2">
                                        <FaTimesCircle style={{ color: '#ef4444', margin: '0 auto' }} />
                                    </div>
                                    <span className="font-black text-sm sm:text-base block" style={{ color: '#f2f3ff' }}>
                                        BELUM
                                    </span>
                                    <span className="text-xs font-medium block mt-1" style={{ color: '#ebae3b' }}>
                                        Belum Follow
                                    </span>
                                </div>
                            </label>
                        </div>
                        <a
                            href="https://www.instagram.com/tasisstembayo/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold hover:opacity-80 transition-all"
                            style={{ backgroundColor: '#584928', color: '#f2f3ff' }}
                        >
                            <FaInstagram className="text-lg" />
                            Kunjungi Instagram TASIS
                        </a>
                    </div>

                    <div>
                        <label className="block text-sm sm:text-base font-bold mb-3 sm:mb-4 tracking-wide" style={{ color: '#f2f3ff', textTransform: 'uppercase', fontSize: 'clamp(0.75rem, 2vw, 0.875rem)', letterSpacing: '0.5px' }}>
                            Sudah join grup WA TASIS? <span style={{ color: '#ebae3b' }}>*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            <label
                                className="relative cursor-pointer group"
                                style={{
                                    opacity: formData.joinWA === 'Tidak' ? 0.6 : 1,
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <input
                                    type="radio"
                                    name="joinWA"
                                    value="Ya"
                                    required
                                    checked={formData.joinWA === 'Ya'}
                                    onChange={(e) => setFormData({ ...formData, joinWA: e.target.value })}
                                    className="peer sr-only"
                                />
                                <div
                                    className="p-4 sm:p-5 rounded-xl border-3 text-center transition-all duration-300 peer-checked:scale-105 group-hover:scale-[1.02]"
                                    style={{
                                        borderColor: formData.joinWA === 'Ya' ? '#ebae3b' : '#3d321c',
                                        backgroundColor: formData.joinWA === 'Ya' ? '#2a2f36' : '#1a1f26',
                                        borderWidth: '3px',
                                        boxShadow: formData.joinWA === 'Ya' ? '0 0 20px rgba(235, 174, 59, 0.3)' : 'none'
                                    }}
                                >
                                    <div className="text-3xl sm:text-4xl mb-2">
                                        <FaCheckCircle style={{ color: '#25D366', margin: '0 auto' }} />
                                    </div>
                                    <span className="font-black text-sm sm:text-base block" style={{ color: '#f2f3ff' }}>
                                        SUDAH
                                    </span>
                                    <span className="text-xs font-medium block mt-1" style={{ color: '#ebae3b' }}>
                                        Sudah Join
                                    </span>
                                </div>
                            </label>

                            <label
                                className="relative cursor-pointer group"
                                style={{
                                    opacity: formData.joinWA === 'Ya' ? 0.6 : 1,
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <input
                                    type="radio"
                                    name="joinWA"
                                    value="Tidak"
                                    required
                                    checked={formData.joinWA === 'Tidak'}
                                    onChange={(e) => setFormData({ ...formData, joinWA: e.target.value })}
                                    className="peer sr-only"
                                />
                                <div
                                    className="p-4 sm:p-5 rounded-xl border-3 text-center transition-all duration-300 peer-checked:scale-105 group-hover:scale-[1.02]"
                                    style={{
                                        borderColor: formData.joinWA === 'Tidak' ? '#ebae3b' : '#3d321c',
                                        backgroundColor: formData.joinWA === 'Tidak' ? '#2a2f36' : '#1a1f26',
                                        borderWidth: '3px',
                                        boxShadow: formData.joinWA === 'Tidak' ? '0 0 20px rgba(235, 174, 59, 0.3)' : 'none'
                                    }}
                                >
                                    <div className="text-3xl sm:text-4xl mb-2">
                                        <FaTimesCircle style={{ color: '#ef4444', margin: '0 auto' }} />
                                    </div>
                                    <span className="font-black text-sm sm:text-base block" style={{ color: '#f2f3ff' }}>
                                        BELUM
                                    </span>
                                    <span className="text-xs font-medium block mt-1" style={{ color: '#ebae3b' }}>
                                        Belum Join
                                    </span>
                                </div>
                            </label>
                        </div>
                        <a
                            href="https://chat.whatsapp.com/GOteap5ZxLO5DfF41Wn1jr?mode=wwt"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold hover:opacity-80 transition-all"
                            style={{ backgroundColor: '#25D366', color: '#ffffff' }}
                        >
                            <FaWhatsapp className="text-lg" />
                            Join Grup WhatsApp TASIS
                        </a>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 rounded-lg font-black text-lg tracking-wide transition-all hover:opacity-90 disabled:opacity-50"
                        style={{
                            backgroundColor: '#ebae3b',
                            color: '#0d1216',
                            textTransform: 'uppercase'
                        }}
                    >
                        {loading ? 'Mengirim...' : 'Kirim Pendaftaran'}
                    </button>
                </form>
            </div>
        </div>
    );
}