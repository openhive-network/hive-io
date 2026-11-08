'use client';

import React, { useState } from 'react';
import { useMainStore } from '@/store/useMainStore';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { EcoDetailed } from '../app/EcoDetailed';

export const ModalEco: React.FC = () => {
  const activeEco = useMainStore(state => state.activeEco);
  const resetActiveEco = useMainStore(state => state.resetActiveEco);

  const showModal = !!activeEco.id;

  // Closing resets activeEco to {} at once, but the dialog stays mounted for
  // its exit animation. Keep showing the last app until then: an empty item
  // crashed App (types.join) and took the whole page down.
  const [shownEco, setShownEco] = useState(activeEco);
  if (activeEco.id && activeEco !== shownEco) {
    setShownEco(activeEco);
  }

  // The app icons open this dialog through the store, not a Dialog.Trigger,
  // so Radix has nothing to return focus to. Return it to the shown app's icon.
  const handleCloseAutoFocus = (event: Event) => {
    const icon = [
      ...document.querySelectorAll<HTMLElement>('[data-track-app-name]'),
    ]
      .find((el) => el.dataset.trackAppName === shownEco.name)
      ?.querySelector<HTMLElement>('button[aria-haspopup="dialog"]');
    if (icon) {
      event.preventDefault();
      icon.focus();
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetActiveEco();
    }
  };

  return (
    <Dialog open={showModal} onOpenChange={handleOpenChange}>
      <DialogContent data-track-placement="eco_modal" onCloseAutoFocus={handleCloseAutoFocus}className="bg-[#f8f8f9] pb-[15px] w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)] sm:!max-w-[750px] max-h-[90vh] overflow-y-auto p-0">
        {/* Screen readers announce the dialog by these; the card shows both visually. */}
        <DialogTitle className="sr-only">{shownEco.name}</DialogTitle>
        <DialogDescription className="sr-only">{shownEco.description}</DialogDescription>
        {shownEco.id && <EcoDetailed item={shownEco} />}
      </DialogContent>
    </Dialog>
  );
};
