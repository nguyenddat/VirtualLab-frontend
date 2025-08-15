'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  X, 
  Settings, 
  Save,
  RotateCcw,
  Info
} from 'lucide-react';
import { useAuthContext } from '@/features/auth/contexts/auth-context';
import { useTeacherExperimentsSWR } from '../hooks/use-teacher-experiments-swr';
import { toast } from 'sonner';

interface EditExperimentPanelProps {
  isOpen: boolean;
  onClose: () => void;
  experimentData: any;
  experimentId: string;
  iframeRef: React.RefObject<HTMLIFrameElement | null>;
}

export const EditExperimentPanel = ({
  isOpen,
  onClose,
  experimentData,
  experimentId,
  iframeRef,
}: EditExperimentPanelProps) => {
  const { user } = useAuthContext();
  const { updateBasicInfo, updateDevices } = useTeacherExperimentsSWR();
  const [isSaving, setIsSaving] = useState(false);
  const isSavingRef = useRef(false);
  
  const [formData, setFormData] = useState({
    name: experimentData?.name || '',
    public_status: experimentData?.public_status || 'private',
    description: experimentData?.description || '',
  });

  // Debug: Log when component mounts/unmounts
  useEffect(() => {
    console.log('EditExperimentPanel mounted/updated', { experimentId, isOpen });
    return () => {
      console.log('EditExperimentPanel unmounting');
    };
  }, [experimentId, isOpen]);

  // Reset saving state when panel opens/closes
  useEffect(() => {
    if (!isOpen) {
      isSavingRef.current = false;
      setIsSaving(false);
    }
  }, [isOpen]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveChanges = async () => {
    if (!user?.id) {
      toast.error('Không tìm thấy thông tin người dùng');
      return;
    }

    if (isSavingRef.current) {
      console.log('Already saving, skipping...');
      return;
    }

    isSavingRef.current = true;
    setIsSaving(true);
    console.log('Starting save process...');
    
    try {
      // Lấy dữ liệu devices từ iframe
      let devices = {
        devices: [],
        connections: [],
      };
      if (iframeRef.current) {
        const contentWindow = iframeRef.current.contentWindow as any;
        if (contentWindow && typeof contentWindow.getCurrentDevices === 'function') {
          devices = contentWindow.getCurrentDevices();
          console.log('Current devices from iframe:', devices);
        } else {
          console.log('getCurrentDevices function not found in iframe');
        }
      }

      // Cập nhật thông tin cơ bản
      const basicInfoParams = {
        experiment_id: parseInt(experimentId, 10),
        name: formData.name,
        description: formData.description,
        status: 'active', // Mặc định là active
        public_status: formData.public_status,
      };

      console.log('Calling updateBasicInfo with params:', basicInfoParams);
      await updateBasicInfo(parseInt(user.id, 10), basicInfoParams);
      console.log('Basic info updated successfully');

      // Cập nhật devices nếu có
      if (devices) {
        const deviceParams = {
          experiment_id: parseInt(experimentId, 10),
          devices: devices["devices"],
          connections: devices["connections"], // TODO: Lấy connections từ iframe nếu cần
        };

        console.log('Calling updateDevices with params:', deviceParams);
        await updateDevices(parseInt(user.id, 10), deviceParams);
        console.log('Devices updated successfully');
      } else {
        console.log('No devices to update');
      }

      toast.success('Lưu thay đổi thành công!');
      
    } catch (error) {
      console.error('Error saving changes:', error);
      toast.error('Có lỗi xảy ra khi lưu thay đổi');
    } finally {
      isSavingRef.current = false;
      setIsSaving(false);
      console.log('Save process completed');
    }
  };

  const handleResetChanges = () => {
    setFormData({
      name: experimentData?.name || '',
      public_status: experimentData?.public_status || 'private',
      description: experimentData?.description || '',
    });
  };

  if (!isOpen) return null;

  return (
    <div className={`absolute right-0 top-0 h-full w-96 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 shadow-xl z-50 flex flex-col transition-transform duration-300 overflow-hidden ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold">Chỉnh sửa thí nghiệm</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-8 w-8 p-0"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Content - Fill remaining space without scroll */}
      <div className="flex-1 overflow-hidden p-4 min-h-0">
        <div className="h-full flex flex-col">
          {/* Basic Information Card */}
          <Card className="flex-1 flex flex-col">
            <CardHeader className="pb-3 flex-shrink-0">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-600" />
                <CardTitle className="text-base">Thông tin cơ bản</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto space-y-4">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name">Tên thí nghiệm</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Nhập tên thí nghiệm"
                  className="w-full"
                />
              </div>

              {/* Public Status Field */}
              <div className="space-y-2">
                <Label htmlFor="public_status">Trạng thái công khai</Label>
                <Select
                  value={formData.public_status}
                  onValueChange={(value) => handleInputChange('public_status', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn trạng thái công khai" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private">Riêng tư</SelectItem>
                    <SelectItem value="public">Công khai</SelectItem>
                    <SelectItem value="shared">Chia sẻ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Description Field */}
              <div className="space-y-2">
                <Label htmlFor="description">Mô tả</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Nhập mô tả thí nghiệm"
                  className="w-full min-h-[100px] resize-none"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-3 flex-shrink-0">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetChanges}
            className="flex-1"
            disabled={isSaving}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Đặt lại
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleSaveChanges}
            className="flex-1 bg-green-600 hover:bg-green-700"
            disabled={isSaving}
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}
          </Button>
        </div>
        
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Thay đổi sẽ được áp dụng ngay lập tức
        </div>
      </div>
    </div>
  );
};
