const IndexService = require('../services/IndexService');

module.exports = {
    /**
     * Buscar todas as turmas
     * @param {*} req 
     * @param {*} res 
     */
    getAllClasses: async (req, res) => {
        let json = {error: '', results:[]};

        let classes = await IndexService.getAll();

        for(let i in classes ){
            json.results.push({
                code: classes[i].idturma,
            });
        }

        res.json(json);
    },

    /**
     * Buscar apenas uma turma
     * @param {*} req 
     * @param {*} res 
     */
    onlyClasse: async(req, res) => {
        let json = {error:'', result:{}}

        let code  = req.params.code;
        let classe = await IndexService.getOnly(code);

        if (classe){
            json.result = classe;
        }

        res.json(json);
    },

    /**
     * Inserir uma turma na base de dados
     * @param {*} req 
     * @param {*} res 
     */
    insert: async(req, res) => {
        let json  = {error:'', result:{}}
        
        let time = req.body.horario;
        let duration = req.body.duracao;
        let startDate = req.body.datainicio;
        let endDate = req.body.datafim;
        let exercise = req.body.atividade_idAtividade
        let instructor = req.body.instrutor_idinstrutor;

        if (time) {
            let registration = await IndexService.insertClasse(time, duration, startDate,endDate, exercise, instructor);
            json.result = {
                idturma: registration,
                time, 
                duration,
                startDate,
                endDate,
                exercise,
                instructor
            };
        } else {
            json.error = 'Campos não enviados'
        }

        res.json(json);
    },

    /**
     * Alterar a turma cadastrada
     * @param {*} req 
     * @param {*} res 
     */
    change: async(req, res) => {
        let json  = {error:'', result:{}}

        let id = req.params.id;
        let time = req.body.horario;
        let duration = req.body.duracao;
        let startDate = req.body.datainicio;
        let endDate = req.body.datafim;
        let exercise = req.body.atividade_idAtividade
        let instructor = req.body.instrutor_idinstrutor;

        if (id) {
            await IndexService.changeClasse(id, time, duration, startDate,endDate, exercise, instructor);
            json.result = {
                id,
                time, 
                duration,
                startDate,
                endDate,
                exercise,
                instructor
            };
        } else {
            json.error = 'Campos não enviados'
        }

        res.json(json);
    },

    /**
     * Deletar a classe
     * @param {*} req 
     * @param {*} res 
     */
    delete: async(req, res) => {
        let json = {error:'', result:{}};

        await IndexService.deleteClasse(req.params.id);

        res.json(json);
    }
    
}