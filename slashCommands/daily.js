const { SimpleEmbed, gif, sym, prefix } = require('../functioon/function');

module.exports = {
    name: 'daily',
    description: 'Collect daily earnings. 24hr cool down.',
    execute: async (interaction, client) => {
        try{
            const user = interaction.message.author;
            
            let userData = await getUser(user.id);
  
            const bonus = 500;
            const rewrad = userData.dailySystem.dailyStack + bonus;
            const claimInterval = 24 * 60 * 60 * 1000;
      
          if(!userData.dailySystem.daily || Date.now() - userData.dailySystem.daily >= claimInterval){
            
            await interaction.reply({ embeds: [SimpleEmbed(`<@${user.id}> has claim your daily rewrad: ${gif.cash} **${rewrad.toLocaleString()}**$`)] });
            
            userData.dailySystem.dailyStack += 159;
            userData.balance += rewrad;
            userData.dailySystem.daily = Date.now();
      
            await userData.save();
          }else{
            
            const timeRemaining = claimInterval - (Date.now() - userData.dailySystem.daily);
            const hours = Math.floor(timeRemaining / 3600000);
            const minutes = Math.floor((timeRemaining % 3600000) / 60000);
            const seconds = Math.floor((timeRemaining % 60000) / 1000);
      
            await interaction.reply({ embeds: [SimpleEmbed(`<@${user.id}> You already claimed Try again in **${hours}H ${minutes}M ${seconds}S**`)] });
          }
        }catch(error){
          console.log(`daily error ${error}`); 
        }
    },
};
