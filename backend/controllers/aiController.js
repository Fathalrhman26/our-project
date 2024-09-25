/*const axios = require('axios');

exports.getRecipeSuggestions = async (req, res) => {
    //const { ingredients } = req.body;
    //content:' Suggest recipes using these ingredients: ${ingredients.join(', ')}
         const {Recipes} = req.body;
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: 'Suggest recipes using these recipes ${Recipes.join(',')}' 
                
            }],
        }, {
            headers: {
                'Authorization':' Bearer ${process.env.OPENAI_API_KEY}',
                'Content-Type': 'application/json',
            },
        });

        res.json(response.data.choices[0].message.content);
    }    
        res.json(response.data.choices[0].message.content);
    }  catch (error){
        res.status(500).json({error:error.message});
    }*/
const axios = require('axios');
exports.getRecipeSuggestions = async (req, res) => {
    const {Recipes} = req.body;
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', 'content: Suggest recipes using these recipes : ${Recipes.join(':')}' }],
                
            
        }, {
            headers: {
                'Authorization':' Bearer ${process.env.OPENAI_API_KEY}',
                'Content-Type': 'application/json',
            },
        });

        res.json(response.data.choices[0].message.content);
    } catch (error){
        res.status(500).json({error:error.message});
    }
};