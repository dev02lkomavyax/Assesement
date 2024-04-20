


const errorHandler = (err, req, res, next) => {
    
    console.error(err);

    // Check if the error is an instance of an Error object
    if (err instanceof Error) {
        
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: err.message });
        }
        
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    // If it's not an Error object, return a generic error message
    return res.status(500).json({ error: 'Internal Server Error' });
};

module.exports = errorHandler;
