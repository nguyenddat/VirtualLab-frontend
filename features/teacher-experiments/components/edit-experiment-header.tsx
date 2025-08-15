'use client';

import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  EyeOff
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface EditExperimentHeaderProps {
  experimentId: string;
  experimentData: any;
  isEditPanelOpen: boolean;
  onToggleEditPanel: () => void;
}

export const EditExperimentHeader = ({
  experimentId,
  experimentData,
  isEditPanelOpen,
  onToggleEditPanel,
}: EditExperimentHeaderProps) => {
  const router = useRouter();

  const handleBack = () => {
    router.push('/teacher/lessons');
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving experiment...');
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex-shrink-0">
      <div className="flex items-center justify-between">
        {/* Left side - Back button and title */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </Button>
          
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Chỉnh sửa thí nghiệm
          </h1>
        </div>

        {/* Right side - Action buttons */}
        <div className="flex items-center gap-2">
          {/* Save button */}
          <Button
            variant="default"
            size="sm"
            onClick={handleSave}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
          >
            <Save className="w-4 h-4" />
            Lưu thay đổi
          </Button>

          {/* Toggle edit panel button */}
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleEditPanel}
            className="flex items-center gap-2"
          >
            {isEditPanelOpen ? (
              <>
                <EyeOff className="w-4 h-4" />
                Ẩn bảng chỉnh sửa
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                Hiện bảng chỉnh sửa
              </>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};
