import {LegacyRef} from 'react';

export type RBSheetRef = LegacyRef<{
  close?: () => void;
  open?: () => void;
}>;
