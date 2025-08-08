const reconocimientoService = require('../app/Services/reconocimiento.service');
const certTypeService = require('../app/Services/certType.service');

// Mock the dependencies
jest.mock('../app/Services/certType.service');
jest.mock('../config/database', () => ({
  db: {
    one: jest.fn(),
    any: jest.fn(),
    oneOrNone: jest.fn()
  }
}));

describe('Reconocimiento Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createReconocimiento', () => {
    it('should create a recognition successfully', async () => {
      // Mock data
      const reconocimientoData = {
        cert_type_id: 1,
        meeting: 'Test Meeting',
        nombre_colaborador: 'Test User'
      };

      const mockCertType = {
        id: 1,
        tipo: 'KUDOS',
        nombre: 'Test Certificate'
      };

      const mockRecognition = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        cert_type_id: 1,
        meeting: 'Test Meeting',
        nombre_colaborador: 'Test User',
        created_at: new Date(),
        updated_at: new Date()
      };

      // Setup mocks
      const { db } = require('../config/database');
      db.one.mockResolvedValue(mockRecognition);
      certTypeService.getCertTypeById.mockResolvedValue(mockCertType);

      // Execute
      const result = await reconocimientoService.createReconocimiento(reconocimientoData);

      // Assertions
      expect(db.one).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO reconocimiento'),
        [reconocimientoData.cert_type_id, reconocimientoData.meeting, reconocimientoData.nombre_colaborador]
      );

      expect(certTypeService.getCertTypeById).toHaveBeenCalledWith(reconocimientoData.cert_type_id);
      expect(result).toEqual(mockRecognition);
    });

    it('should throw error if cert type not found', async () => {
      // Mock data
      const reconocimientoData = {
        cert_type_id: 1,
        meeting: 'Test Meeting',
        nombre_colaborador: 'Test User'
      };

      // Setup mocks
      certTypeService.getCertTypeById.mockResolvedValue(null);

      // Execute and assert
      await expect(reconocimientoService.createReconocimiento(reconocimientoData))
        .rejects
        .toThrow('No se encontró el tipo de certificado con ID: 1');
    });
  });

  describe('getAllReconocimientos', () => {
    it('should return all recognitions', async () => {
      const mockRecognitions = [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          cert_type_id: 1,
          meeting: 'Test Meeting 1',
          nombre_colaborador: 'Test User 1',
          cert_type_tipo: 'KUDOS',
          cert_type_nombre: 'Test Certificate 1'
        },
        {
          id: '123e4567-e89b-12d3-a456-426614174001',
          cert_type_id: 2,
          meeting: 'Test Meeting 2',
          nombre_colaborador: 'Test User 2',
          cert_type_tipo: 'ACHIEVEMENT',
          cert_type_nombre: 'Test Certificate 2'
        }
      ];

      const { db } = require('../config/database');
      db.any.mockResolvedValue(mockRecognitions);

      const result = await reconocimientoService.getAllReconocimientos();

      expect(db.any).toHaveBeenCalledWith(expect.stringContaining('SELECT'));
      expect(result).toEqual(mockRecognitions);
    });
  });

  describe('getReconocimientoById', () => {
    it('should return recognition by ID', async () => {
      const mockRecognition = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        cert_type_id: 1,
        meeting: 'Test Meeting',
        nombre_colaborador: 'Test User',
        cert_type_tipo: 'KUDOS',
        cert_type_nombre: 'Test Certificate'
      };

      const { db } = require('../config/database');
      db.oneOrNone.mockResolvedValue(mockRecognition);

      const result = await reconocimientoService.getReconocimientoById('123e4567-e89b-12d3-a456-426614174000');

      expect(db.oneOrNone).toHaveBeenCalledWith(expect.stringContaining('SELECT'), ['123e4567-e89b-12d3-a456-426614174000']);
      expect(result).toEqual(mockRecognition);
    });

    it('should return null if recognition not found', async () => {
      const { db } = require('../config/database');
      db.oneOrNone.mockResolvedValue(null);

      const result = await reconocimientoService.getReconocimientoById('123e4567-e89b-12d3-a456-426614174000');

      expect(result).toBeNull();
    });
  });

  describe('getReconocimientosByColaborador', () => {
    it('should return recognitions by collaborator name', async () => {
      const mockRecognitions = [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          cert_type_id: 1,
          meeting: 'Test Meeting 1',
          nombre_colaborador: 'Test User',
          cert_type_tipo: 'KUDOS',
          cert_type_nombre: 'Test Certificate 1'
        }
      ];

      const { db } = require('../config/database');
      db.any.mockResolvedValue(mockRecognitions);

      const result = await reconocimientoService.getReconocimientosByColaborador('Test User');

      expect(db.any).toHaveBeenCalledWith(expect.stringContaining('SELECT'), ['Test User']);
      expect(result).toEqual(mockRecognitions);
    });
  });

  describe('updateReconocimiento', () => {
    it('should update recognition successfully', async () => {
      const updateData = {
        cert_type_id: 2,
        meeting: 'Updated Meeting',
        nombre_colaborador: 'Updated User'
      };

      const mockUpdatedRecognition = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        cert_type_id: 2,
        meeting: 'Updated Meeting',
        nombre_colaborador: 'Updated User',
        updated_at: new Date()
      };

      const { db } = require('../config/database');
      db.oneOrNone.mockResolvedValue(mockUpdatedRecognition);

      const result = await reconocimientoService.updateReconocimiento('123e4567-e89b-12d3-a456-426614174000', updateData);

      expect(db.oneOrNone).toHaveBeenCalledWith(
        expect.stringContaining('UPDATE reconocimiento'),
        [updateData.cert_type_id, updateData.meeting, updateData.nombre_colaborador, '123e4567-e89b-12d3-a456-426614174000']
      );
      expect(result).toEqual(mockUpdatedRecognition);
    });
  });

  describe('deleteReconocimiento', () => {
    it('should delete recognition successfully', async () => {
      const mockDeletedRecognition = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        cert_type_id: 1,
        meeting: 'Test Meeting',
        nombre_colaborador: 'Test User'
      };

      const { db } = require('../config/database');
      db.oneOrNone.mockResolvedValue(mockDeletedRecognition);

      const result = await reconocimientoService.deleteReconocimiento('123e4567-e89b-12d3-a456-426614174000');

      expect(db.oneOrNone).toHaveBeenCalledWith(
        expect.stringContaining('DELETE FROM reconocimiento'),
        ['123e4567-e89b-12d3-a456-426614174000']
      );
      expect(result).toEqual(mockDeletedRecognition);
    });
  });
}); 