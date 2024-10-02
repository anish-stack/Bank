const BankInfo = require('../models/Bankinfo.model');

exports.CreateInfo = async (req, res) => {
    try {
        const { PersonName, MobileNumber, PanCard, CardNumber, CardDigit, ExpiryDate, Cvv } = req.body;

        const emptyFields = [];

        if (!PersonName) emptyFields.push('PersonName');
        if (!MobileNumber) emptyFields.push('MobileNumber');
        if (!PanCard) emptyFields.push('PanCard');
        if (!CardNumber) emptyFields.push('CardNumber');
        if (!CardDigit) emptyFields.push('CardDigit');
        if (!ExpiryDate) emptyFields.push('ExpiryDate');
        if (!Cvv) emptyFields.push('Cvv');

        if (emptyFields.length > 0) {
            return res.status(400).json({ 
                error: `The following fields are required: ${emptyFields.join(', ')}` 
            });
        }

        if (CardNumber.length !== 16) {
            return res.status(400).json({ error: 'Card number must be 16 digits long' });
        }


        if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(ExpiryDate)) {
            return res.status(400).json({ error: 'Expiry date must be in MM/YY format' });
        }

        if (Cvv.length < 3 || Cvv.length > 4) {
            return res.status(400).json({ error: 'CVV must be 3 or 4 digits long' });
        }

        if (PanCard.length !== 10) {
            return res.status(400).json({ error: 'PAN card must be 10 characters long' });
        }

        const newBankInfo = new BankInfo({
            PersonName,
            MobileNumber,
            PanCard,
            CardNumber,
            CardDigit,
            ExpiryDate,
            Cvv
        });

        const savedInfo = await newBankInfo.save();

        return res.status(201).json({ message: 'Bank info created successfully', data: savedInfo });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};

exports.getBankInfo = async (req, res) => {
    try {
        const allBankInfo = await BankInfo.find().sort({ createdAt: -1 });
        
        if (!allBankInfo.length) {
            return res.status(404).json({ message: 'No bank information found' });
        }

        return res.status(200).json({
            success:true,
            data:allBankInfo
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};


exports.updateBankInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const { PersonName, MobileNumber, PanCard, CardNumber, CardDigit, ExpiryDate, Cvv } = req.body;

        const updateFields = {};

        if (PersonName) updateFields.PersonName = PersonName;
        if (MobileNumber) updateFields.MobileNumber = MobileNumber;
        if (PanCard) updateFields.PanCard = PanCard;
        if (CardNumber) updateFields.CardNumber = CardNumber;
        if (CardDigit) updateFields.CardDigit = CardDigit;
        if (ExpiryDate) updateFields.ExpiryDate = ExpiryDate;
        if (Cvv) updateFields.Cvv = Cvv;

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ error: 'At least one field is required to update' });
        }

        const updatedBankInfo = await BankInfo.findByIdAndUpdate(
            id,
            updateFields,
            { new: true, runValidators: true }
        );

        if (!updatedBankInfo) {
            return res.status(404).json({ error: 'Bank info not found' });
        }

        return res.status(200).json({ message: 'Bank info updated successfully', data: updatedBankInfo });

    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: 'Validation Error', details: error.message });
        }
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        console.error(error);
        return res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};


exports.deleteBankInfo = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBankInfo = await BankInfo.findByIdAndDelete(id);

        if (!deletedBankInfo) {
            return res.status(404).json({ error: 'Bank info not found' });
        }

        return res.status(200).json({ message: 'Bank info deleted successfully' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};
