"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, Phone, BookOpen, Video, FileText } from "lucide-react";

const HelpPage = () => {
    const faqData = [
        {
            question: "Làm thế nào để sử dụng mô phỏng?",
            answer: "Bạn có thể truy cập vào trang Mô phỏng và chọn mô phỏng phù hợp với môn học. Mỗi mô phỏng đều có hướng dẫn chi tiết và các thí nghiệm tương tác."
        },
        {
            question: "Tôi có thể tạo tài khoản học sinh không?",
            answer: "Có, bạn có thể đăng ký tài khoản học sinh tại trang Đăng ký. Chỉ cần cung cấp thông tin cơ bản và email hợp lệ."
        },
        {
            question: "Làm thế nào để giáo viên quản lý lớp học?",
            answer: "Giáo viên có thể truy cập Console quản lý để tạo lớp học, thêm học sinh, và theo dõi tiến độ học tập của học sinh."
        },
        {
            question: "Có thể sử dụng mô phỏng offline không?",
            answer: "Hiện tại các mô phỏng cần kết nối internet để hoạt động. Chúng tôi đang phát triển tính năng offline."
        },
        {
            question: "Làm thế nào để báo cáo lỗi?",
            answer: "Bạn có thể liên hệ với chúng tôi qua email hoặc sử dụng form liên hệ trong trang Hỗ trợ này."
        }
    ];

    const contactMethods = [
        {
            icon: <Mail className="h-6 w-6" />,
            title: "Email",
            description: "Gửi email cho chúng tôi",
            action: "support@vilab.edu.vn",
            href: "mailto:support@vilab.edu.vn"
        },
        {
            icon: <MessageCircle className="h-6 w-6" />,
            title: "Chat trực tuyến",
            description: "Trò chuyện với nhân viên hỗ trợ",
            action: "Bắt đầu chat",
            href: "#"
        },
        {
            icon: <Phone className="h-6 w-6" />,
            title: "Điện thoại",
            description: "Gọi điện cho chúng tôi",
            action: "+84 123 456 789",
            href: "tel:+84123456789"
        }
    ];

    const resources = [
        {
            icon: <BookOpen className="h-6 w-6" />,
            title: "Hướng dẫn sử dụng",
            description: "Tài liệu hướng dẫn chi tiết",
            href: "#"
        },
        {
            icon: <Video className="h-6 w-6" />,
            title: "Video hướng dẫn",
            description: "Các video tutorial",
            href: "#"
        },
        {
            icon: <FileText className="h-6 w-6" />,
            title: "Tài liệu kỹ thuật",
            description: "Tài liệu kỹ thuật chi tiết",
            href: "#"
        }
    ];

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Hỗ trợ</h1>
                <p className="text-muted-foreground">
                    Chúng tôi luôn sẵn sàng hỗ trợ bạn trong quá trình sử dụng nền tảng ViLAB
                </p>
            </div>

            {/* Contact Methods */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {contactMethods.map((method, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardHeader className="text-center">
                            <div className="mx-auto mb-2 text-primary">
                                {method.icon}
                            </div>
                            <CardTitle className="text-lg">{method.title}</CardTitle>
                            <CardDescription>{method.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                            <Button asChild variant="outline" className="w-full">
                                <a href={method.href}>{method.action}</a>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* FAQ Section */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Câu hỏi thường gặp</CardTitle>
                    <CardDescription>
                        Tìm câu trả lời cho các câu hỏi phổ biến
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        {faqData.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className="text-left">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent>
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>

            {/* Resources */}
            <Card>
                <CardHeader>
                    <CardTitle>Tài liệu và hướng dẫn</CardTitle>
                    <CardDescription>
                        Khám phá các tài liệu hướng dẫn và video tutorial
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {resources.map((resource, index) => (
                            <Card key={index} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="text-primary mb-2">
                                        {resource.icon}
                                    </div>
                                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                                    <CardDescription>{resource.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button asChild variant="outline" className="w-full">
                                        <a href={resource.href}>Xem chi tiết</a>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default HelpPage;
