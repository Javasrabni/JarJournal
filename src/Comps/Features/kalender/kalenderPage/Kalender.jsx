import React, { useState, useEffect, useContext } from 'react';
import { Badge, Calendar, Modal, Form, Input, DatePicker, Select, Button, List, ConfigProvider, theme } from 'antd';
import 'moment/locale/id'; // Mengimpor locale moment untuk Indonesia
import idLocale from 'antd/lib/locale/id_ID'; // Locale Indonesia untuk Ant Design
import moment from 'moment';
import './kalenderStyle.css'
import { ThemeAppContext } from '../../Theme/toggleTheme.jsx/ThemeAppContext';

moment.locale('id'); // Mengatur locale moment ke Bahasa Indonesia

const { Option } = Select;

const KalenderPage = () => {
    const { themeActive, setThemeActive } = useContext(ThemeAppContext)


    const [events, setEvents] = useState(() => {
        const saveEvents = localStorage.getItem('calendarEvents')
        return saveEvents ? JSON.parse(saveEvents) : []
    }); // State untuk menyimpan acara
    const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal
    const [form] = Form.useForm(); // Ant Design form instance

    // Simpan data acara ke localStorage setiap kali ada perubahan pada state `events`
    useEffect(() => {
        localStorage.setItem('calendarEvents', JSON.stringify(events));
    }, [events]);

    // Menangani penambahan acara baru
    const handleAddEvent = (values) => {
        const { date, type, content } = values;
        const formattedDate = date.format('DD MMM YYYY'); // Format tanggal lengkap
        setEvents((prevEvents) => [
            ...prevEvents,
            { date: formattedDate, type, content },
        ]);
        setIsModalOpen(false); // Tutup modal
        form.resetFields(); // Reset form input
    };

    // Menangani penghapusan acara
    const handleDeleteEvent = (index) => {
        const newEvents = events.filter((_, i) => i !== index); // Filter berdasarkan indeks
        setEvents(newEvents); // Update state
    };

    // Mendapatkan data acara berdasarkan tanggal lengkap (YYYY-MM-DD)
    const getListData = (value) => {
        const selectedDate = value.format('DD MMM YYYY'); // Format tanggal yang dipilih
        return events.filter((event) => event.date === selectedDate); // Bandingkan tanggal lengkap
    };

    const getStatusColor = (type) => {
        switch (type) {
            case 'Penting':
                return 'error';
            case 'Santai':
                return 'warning';
            case 'Fleksibel':
                return 'success';
            default:
                return 'default';
        }
    };

    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map((item, index) => (
                    <li key={index}>
                        <Badge status={getStatusColor(item.type)} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    };

    const monthCellRender = (value) => {
        return (
            <div style={{ fontWeight: 'bold', color: themeActive ? 'white' : 'black' }}>
                {value.format('MMMM')} {/* Contoh: Januari, Februari */}
            </div>
        );
    };

    return (
        <div className="w-full h-full flex justify-center" style={{ paddingBottom: '32px', backgroundColor: themeActive ? '#141414' : 'white' }}>
            <div className="w-[360px] h-full p-[16px]">

                {/* Kalender */}
                <ConfigProvider locale={idLocale} theme={{
                    algorithm: themeActive ? theme.darkAlgorithm : theme.defaultAlgorithm,
                    token: {
                        colorPrimary: themeActive ? '#FFD700' : '#1890ff', // Warna utama
                        colorBgBase: themeActive ? '#000000' : '#ffffff', // Background dasar
                        colorTextBase: themeActive ? 'white' : '#000000', // Teks dasar
                        colorBorder: themeActive ? 'rgb(38, 38, 38)' : '#d9d9d9', // Warna border
                    },
                }}>
                    <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} className="custom-calendar" />
                </ConfigProvider>



                {/* Daftar Catatan */}
                <div className='w-full h-full flex flex-row justify-between items-center mb-[12px]'>
                    <div>
                        {/* Tombol untuk membuka modal */}
                        <button onClick={() => setIsModalOpen(true)} className={`${themeActive ? 'bg-white text-black' : 'bg-black text-white'} px-[16px] py-[6px] rounded-[8px]`}>
                            <p className='text-[12px]'>Tambah acara</p>
                        </button>
                    </div>
                    <div>
                        {/* <p className='text-[14px] font-[600] mb-[0px]'>Daftar acara</p> */}
                    </div>
                </div>

                <ConfigProvider theme={{
                    algorithm: themeActive ? theme.darkAlgorithm : theme.defaultAlgorithm,
                    token: {
                        colorPrimary: themeActive ? '#FFD700' : '#1890ff', // Warna utama
                        colorBgBase: themeActive ? '#000000' : '#ffffff', // Background dasar
                        colorTextBase: themeActive ? 'white' : '#000000', // Teks dasar
                        colorBorder: themeActive ? 'rgb(38, 38, 38)' : '#d9d9d9', // Warna border
                    },
                }}>
                    <List
                        bordered
                        dataSource={events}
                        renderItem={(item, index) => (
                            <List.Item
                                actions={[
                                    <Button
                                        style={{ paddingRight: '0px' }}

                                        type="link"
                                        danger

                                        onClick={() => handleDeleteEvent(index)}
                                    >
                                        <p className='text-[10px] font-[600]'>Hapus</p>
                                    </Button>,
                                ]}
                            >
                                <div>
                                    <span className='flex flex-col '>
                                        <span>
                                            <p className='text-[12px] '>
                                                <span className='font-[600] font-[inter]'>{item.date}</span>: {item.content}
                                            </p>
                                        </span>
                                        <span style={{ lineHeight: "0", marginTop: '4px' }} >
                                            <p className='text-[10px]'>
                                                <span className='flex items-center gap-[6px]'>
                                                    <Badge status={getStatusColor(item.type)} /> {item.type}
                                                </span>
                                            </p>
                                        </span>
                                    </span>
                                </div>
                            </List.Item>
                        )}
                    />
                </ConfigProvider>


                {/* Modal Tambah Acara */}
                <ConfigProvider theme={{
                    algorithm: themeActive ? theme.darkAlgorithm : theme.defaultAlgorithm, token: {
                        colorPrimary: themeActive ? '#FFD700' : '#1890ff', // Warna utama
                        colorBgBase: themeActive ? '#000000' : '#ffffff', // Background dasar
                        colorTextBase: themeActive ? 'white' : '#000000', // Teks dasar
                        colorBorder: themeActive ? 'rgb(38, 38, 38)' : '#d9d9d9', // Warna border
                    },
                }}>
                    <Modal
                        title="Tambah Acara"
                        open={isModalOpen}
                        onCancel={() => setIsModalOpen(false)}
                        footer={null}
                    >
                        <Form form={form} onFinish={handleAddEvent} layout="vertical">
                            <Form.Item
                                name="date"
                                label="Tanggal"
                                rules={[{ required: true, message: 'Pilih tanggal!' }]}
                            >
                                <DatePicker format='DD-MM-YYYY' />
                            </Form.Item>
                            <Form.Item
                                name="type"
                                label="Tipe Acara"
                                rules={[{ required: true, message: 'Pilih tipe acara!' }]}
                            >
                                <Select>
                                    <Option value="Penting">Penting</Option>
                                    <Option value="Santai">Santai</Option>
                                    <Option value="Fleksibel">Fleksibel</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="content"
                                label="Deskripsi Acara"
                                rules={[{ required: true, message: 'Masukkan deskripsi acara' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Tambahkan
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </ConfigProvider>
            </div>
        </div >
    );
};

export default KalenderPage;
