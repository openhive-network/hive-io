'use client';

import React from 'react';
import { useMainStore } from '@/store/useMainStore';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { EcoDetailed } from '../app/EcoDetailed';

export const ModalEco: React.FC = () => {
  const activeEco = useMainStore(state => state.activeEco);
  const resetActiveEco = useMainStore(state => state.resetActiveEco);

  const showModal = !!activeEco.id;

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetActiveEco();
    }
  };

  return (
    <Dialog open={showModal} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-[#f8f8f9] pb-[15px] w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)] sm:!max-w-[750px] max-h-[90vh] overflow-y-auto p-0">
        <EcoDetailed />
      </DialogContent>
    </Dialog>
  );
};
