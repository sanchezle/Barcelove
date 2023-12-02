const confirmEmail = (req, res) => {
    const token = req.params.token;
    
    // Verify the token
    jwt.verify(token, process.env.CEMAIL_TOKEN_SECRET, function(err, decodedToken) {
        if (err) {
            return res.status(400).json({message: 'The token is invalid or has expired.'});
        }
        const userId = decodedToken._id;

        // Update user's isVerified field to true
        User.findOneAndUpdate({_id: userId}, { isVerified: true }) // <-- Fixed the query here
        .then(() => res.json({message: 'Your account has been successfully verified!'}))
        .catch((err) => res.json({message: 'An error occurred during verification'}));
    });
};


const passwordResetRequest = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
  
    if (!user) {
      return res.status(400).send('No account with that email found');
    }
  
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();
  
    const msg = {
      to: email,
      from: process.env.FROM_EMAIL,
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
             Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n
             http://${req.headers.host}/auth/reset-password/${token}\n\n
             If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };
  
    sgMail.send(msg);
  
    res.send('Password reset email has been sent');
  };


  const resetPassword = async (req, res) => {
    const { token, password, confirmPassword } = req.body;
  
    if (password !== confirmPassword) {
      return res.status(400).send('Passwords do not match');
    }
  
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
  
    if (!user) {
      return res.status(400).send('Password reset token is invalid or has expired');
    }
  
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
  
    res.send('Password has been updated');
  };
  