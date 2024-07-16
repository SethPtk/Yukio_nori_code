const fs = require('fs');
const { getFiles } = require('../../functioon/function');

const slashCommands = fs.readdirSync('./slashCommands').filter(file => file.endsWith('.js'));
const getSlashCommands = getFiles(slashCommands, '../slashCommands');

const economyFile = fs.readdirSync('./commands/economy').filter(file => file.endsWith('.js'));
const gamblingFile = fs.readdirSync('./commands/gambling').filter(file => file.endsWith('.js'));
const utilityFile = fs.readdirSync('./commands/utility').filter(file => file.endsWith('.js'));
const socialFile = fs.readdirSync('./commands/social').filter(file => file.endsWith('.js'));
const giveawayFile = fs.readdirSync('./commands/giveAway').filter(file => file.endsWith('.js'));
const adminFile = fs.readdirSync('./commands/admins').filter(file => file.endsWith('.js'));
const workFile = fs.readdirSync('./commands/work').filter(file => file.endsWith('.js'));
const mineFile = fs.readdirSync('./commands/mine').filter(file => file.endsWith('.js'));
const gameFile = fs.readdirSync('./commands/game').filter(file => file.endsWith('.js'));
const rankFile = fs.readdirSync('./commands/ranking').filter(file => file.endsWith('.js'));
const dragonlFile = fs.readdirSync('./commands/dragon').filter(file => file.endsWith('.js'));
const animalFile = fs.readdirSync('./commands/animal').filter(file => file.endsWith('.js'));
const farmFile = fs.readdirSync('./commands/farm').filter(file => file.endsWith('.js'));

const getEconomy = getFiles(economyFile, '../commands/economy');
const getGambling = getFiles(gamblingFile, '../commands/gambling');
const getUtility = getFiles(utilityFile, '../commands/utility');
const getSocial = getFiles(socialFile, '../commands/social');
const getGiveaway = getFiles(giveawayFile, '../commands/giveAway');
const getAdmin = getFiles(adminFile, '../commands/admins');
const getWork = getFiles(workFile, '../commands/work');
const getMine = getFiles(mineFile, '../commands/mine');
const getGame = getFiles(gameFile, '../commands/game');
const getRank = getFiles(rankFile, '../commands/ranking');
const getDragon = getFiles(dragonlFile, '../commands/dragon');
const getAnimal = getFiles(animalFile, '../commands/animal');
const getFarm = getFiles(farmFile, '../commands/farm');

module.exports = { getEconomy, getGambling, getUtility, getSocial, getGiveaway, getAdmin, getWork, getMine, getGame, getRank, getDragon, getAnimal, getFarm, getSlashCommands };