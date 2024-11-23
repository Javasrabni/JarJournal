import React, { useState } from 'react';
import { Badge, Calendar, Modal, Form, Input, DatePicker, Select, Button } from 'antd';
const { Option } = Select;

const KalenderPage = () => {
    const [events, setEvents] = useState([]); // State untuk menyimpan acara
    const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal
    const [form] = Form.useForm(); // Ant Design form instance

    // Menangani penambahan acara baru
    const handleAddEvent = (values) => {
        const { date, type, content } = values;
        const formattedDate = date.format('YYYY-MM-DD'); // Format tanggal lengkap
        setEvents((prevEvents) => [
            ...prevEvents,
            { date: formattedDate, type, content },
        ]);
        setIsModalOpen(false); // Tutup modal
        form.resetFields(); // Reset form input
    };

    // Mendapatkan data acara berdasarkan tanggal
    const getListData = (value) => {
        const selectedDate = value.format('YYYY-MM-DD'); // Format tanggal yang dipilih
        return events.filter((event) => event.date === selectedDate); // Bandingkan tanggal lengkap
    };

    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map((item, index) => (
                    <li key={index}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    };

    const cellRender = (current, info) => {
        if (info.type === 'date') return dateCellRender(current);
        return info.originNode;
    };

    return (
        <div className='w-full h-full flex justify-center'>
            <div className='w-[360px] h-full '>
                <Button type="primary" onClick={() => setIsModalOpen(true)}>
                    Tambah Acara
                </Button>
                <Calendar cellRender={cellRender} className="custom-calendar" />
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
                            <DatePicker />
                        </Form.Item>
                        <Form.Item
                            name="type"
                            label="Tipe Acara"
                            rules={[{ required: true, message: 'Pilih tipe acara!' }]}
                        >
                            <Select>
                                <Option value="success">Sukses</Option>
                                <Option value="warning">Peringatan</Option>
                                <Option value="error">Kesalahan</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="content"
                            label="Deskripsi Acara"
                            rules={[{ required: true, message: 'Masukkan deskripsi acara!' }]}
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
            </div>
        </div>
    );
};

export default KalenderPage;
