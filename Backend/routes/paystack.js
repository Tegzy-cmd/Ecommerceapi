const router = require('express').Router();
const Paystack = require('paystack-api')('process.env.PAYSTACK_SECRET_KEY');


router.post('payment', async (req, res) => {
    const { email, amount } = req.body;

    try {
        const response = await Paystack.transaction.initialize({
            email,
            amount,
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: 'Payment initialization failed' });
    }
}
)

module.exports = router;
 