"use client";

import { motion } from "framer-motion";
import { Users, BookOpen, FlaskConical, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { StatsPattern } from "./background-pattern";

const statsData = [
  {
    icon: <Users className="size-8" />,
    value: "10,000+",
    label: "Học sinh đang sử dụng",
    description: "Từ các trường học trên toàn quốc"
  },
  {
    icon: <BookOpen className="size-8" />,
    value: "500+",
    label: "Bài giảng STEM",
    description: "Được tạo bởi giáo viên"
  },
  {
    icon: <FlaskConical className="size-8" />,
    value: "50+",
    label: "Mô phỏng thí nghiệm",
    description: "Các môn Vật lý, Hóa học, Sinh học"
  },
  {
    icon: <Award className="size-8" />,
    value: "95%",
    label: "Hài lòng",
    description: "Từ giáo viên và học sinh"
  }
];

export const Stats = () => {
  return (
    <section className="py-8 md:py-12 w-full container relative">
      <StatsPattern />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 relative z-10"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          ViLAB trong số liệu
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Nền tảng học tập STEM được tin tưởng bởi hàng nghìn giáo viên và học sinh trên toàn quốc
        </p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        {statsData.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-all duration-300 h-full backdrop-blur-sm bg-background/80">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold mb-2 text-primary">
                  {stat.value}
                </div>
                <div className="font-semibold mb-2">{stat.label}</div>
                <div className="text-sm text-muted-foreground">
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
