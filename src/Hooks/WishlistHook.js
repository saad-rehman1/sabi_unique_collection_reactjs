// hooks/useCartWishlistActions.js
import { useMutation } from '@tanstack/react-query';
import { useCartWishlistStore } from '../store/CarWishlist';
import toast from 'react-hot-toast';

export const useCartActions = () => {
  const addToCart = useCartWishlistStore((state) => state.addToCart);
  const removeFromCart = useCartWishlistStore((state) => state.removeFromCart);

  const addMutation = useMutation({
    mutationFn: (product) => {
      addToCart(product);
    },
    onSuccess: () => {
      toast.success('✅ Added to Cart!');
    },
  });

  const removeMutation = useMutation({
    mutationFn: (id) => {
      removeFromCart(id);
    },
    onSuccess: () => {
      toast.success('🗑️ Removed from Cart');
    },
  });

  return { addMutation, removeMutation };
};

export const useWishlistActions = () => {
  const addToWishlist = useCartWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useCartWishlistStore((state) => state.removeFromWishlist);

  const addMutation = useMutation({
    mutationFn: (product) => {
      addToWishlist(product);
    },
    onSuccess: () => {
      toast.success('❤️ Added to Wishlist!');
    },
  });

  const removeMutation = useMutation({
    mutationFn: (id) => {
      removeFromWishlist(id);
    },
    onSuccess: () => {
      toast.success('💔 Removed from Wishlist');
    },
  });

  return { addMutation, removeMutation };
};
