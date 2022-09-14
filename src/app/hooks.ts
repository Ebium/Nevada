import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useNevadaDispatch = () => useDispatch<AppDispatch>();
export const useNevadaSelector: TypedUseSelectorHook<RootState> = useSelector;
