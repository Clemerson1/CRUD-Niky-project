const { query } = require('express');
const db = require('../db');

module.exports = {
    getAll: () => {
        return new Promise((resolve, reject) => {

            db.query('SELECT * FROM turma', (error, results) =>{
                if (error){reject(error); return;} 
                resolve(results);
            });

        })
    },

    getOnly: (code) => {
        return new Promise((resolve, reject) => {

            db.query('SELECT * FROM turma where idturma = ?', [code], (error, results) =>{
                if (error){reject(error); return;} 
                
                if (results.length > 0) {
                    resolve(results[0]);
                } else {
                    resolve(false);
                }

            });
        })
    },

    insertClasse: (time, duration, startDate, endDate, exercise, instructor) => {
        return new Promise((resolve, reject) => {

            db.query('INSERT INTO turma (horario, duracao, datainicio, datafim, atividade_idAtividade,\
                    instrutor_idinstrutor) VALUES (?, ?, ?, ?, ?, ?)', 
                    [time, duration, startDate,endDate, exercise, instructor], (error, results) => {
                    if (error){reject(error); return;}
                    resolve(results.insertCode)
            });
        });
    },

    changeClasse: (id, time, duration, startDate, endDate, exercise, instructor) => {
        return new Promise((resolve, reject) => {

            db.query('UPDATE turma SET horario = ?, duracao = ?, datainicio = ?, datafim = ?,\
                    atividade_idAtividade = ?, instrutor_idinstrutor = ? WHERE idturma = ?', 
                    [time, duration, startDate,endDate, exercise, instructor, id], (error, results) => {
                    if (error){reject(error); return;}
                    resolve(results)
            });
        });
    },

    deleteClasse: (id) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM turma WHERE idturma = ?', [id], (error, results) => {
                if (error){reject(error); return;}
                resolve(results);
            })
        })
    }
};