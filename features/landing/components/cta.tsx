"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CTAPattern } from "./background-pattern";

export const CTA = () => {
  return (
    <section className="py-8 md:py-12 w-full container relative">
      <CTAPattern />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 backdrop-blur-sm">
          <CardContent className="p-8 md:p-12 text-center">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-6"
              >
                <div className="inline-flex items-center justify-center p-3 bg-primary/20 rounded-full mb-4">
                  <Play className="size-6 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Sẵn sàng khám phá thế giới STEM?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Tham gia cùng hàng nghìn giáo viên và học sinh đang sử dụng ViLAB để tạo ra những trải nghiệm học tập tuyệt vời
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Link href="/auth/login" passHref>
                  <Button size="lg" className="w-full sm:w-auto">
                    Đăng nhập ngay
                    <ArrowRight className="size-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/explore" passHref>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Khám phá miễn phí
                  </Button>
                </Link>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-sm text-muted-foreground mt-6"
              >
                Truy cập ngay • Hỗ trợ 24/7
              </motion.p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
};
