const express = require('express');
const Cart = require('../models/Cart');
const router = express.Router();
const { authenticateToken, isUser } = require('../middleware/auth');

// 🛒 Get current user's cart
router.get('/', authenticateToken, isUser, async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId }).populate('products.productId');
    res.json(cart?.products || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🛒 Add to cart
router.post('/', authenticateToken, isUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'productId is required' });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({ userId, products: [{ productId, quantity }] });
    } else {
      const existing = cart.products.find(p => p.productId.toString() === productId);

      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }

      await cart.save();
    }

    const populatedCart = await cart.populate('products.productId');
    res.json(populatedCart.products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🛒 Remove item from cart
router.delete('/:productId', authenticateToken, isUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.products = cart.products.filter(p => p.productId.toString() !== productId);
    await cart.save();

    const populatedCart = await cart.populate('products.productId');
    res.json(populatedCart.products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
