const personaService = require('./persona.service');
const reconocimientoService = require('./reconocimiento.service');

module.exports = {
    // Persona services
    createPersona: personaService.createPersona,
    getAllPersonas: personaService.getAllPersonas,
    getPersonaByEmail: personaService.getPersonaByEmail,
    updatePersona: personaService.updatePersona,
    deletePersona: personaService.deletePersona,
    
    // Reconocimiento services
    createReconocimiento: reconocimientoService.createReconocimiento,
    getAllReconocimientos: reconocimientoService.getAllReconocimientos,
    getReconocimientoById: reconocimientoService.getReconocimientoById,
    getReconocimientosByEmail: reconocimientoService.getReconocimientosByEmail,
    getReconocimientosByType: reconocimientoService.getReconocimientosByType,
    updateReconocimiento: reconocimientoService.updateReconocimiento,
    deleteReconocimiento: reconocimientoService.deleteReconocimiento,
    getReconocimientoStats: reconocimientoService.getReconocimientoStats
}; 