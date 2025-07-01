const reconocimientoService = require('../app/Services/reconocimiento.service');
const personaService = require('../app/Services/persona.service');
const certTypeService = require('../app/Services/certType.service');
const { sendRecognitionEmail } = require('../app/Services/SES.service');

// Mock the dependencies
jest.mock('../app/Services/persona.service');
jest.mock('../app/Services/certType.service');
jest.mock('../app/Services/SES.service');
jest.mock('../config/database', () => ({
  db: {
    one: jest.fn()
  }
}));

describe('Reconocimiento Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createReconocimiento', () => {
    it('should create a recognition and send email successfully', async () => {
      // Mock data
      const reconocimientoData = {
        email_persona: 'test@example.com',
        cert_type_id: 1,
        meeting: 'Test Meeting'
      };

      const mockPersona = {
        email: 'test@example.com',
        full_name: 'Test User',
        role: 'Developer',
        team: 'Development'
      };

      const mockCertType = {
        id: 1,
        tipo: 'KUDOS',
        nombre: 'Test Certificate'
      };

      const mockRecognition = {
        id: 1,
        email_persona: 'test@example.com',
        cert_type_id: 1,
        meeting: 'Test Meeting',
        created_at: new Date(),
        updated_at: new Date()
      };

      // Setup mocks
      const { db } = require('../config/database');
      db.one.mockResolvedValue(mockRecognition);
      personaService.getPersonaByEmail.mockResolvedValue(mockPersona);
      certTypeService.getCertTypeById.mockResolvedValue(mockCertType);
      sendRecognitionEmail.mockResolvedValue({ MessageId: 'test-message-id' });

      // Execute
      const result = await reconocimientoService.createReconocimiento(reconocimientoData);

      // Assertions
      expect(db.one).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO reconocimiento'),
        [reconocimientoData.email_persona, reconocimientoData.cert_type_id, reconocimientoData.meeting]
      );

      expect(personaService.getPersonaByEmail).toHaveBeenCalledWith(reconocimientoData.email_persona);
      expect(certTypeService.getCertTypeById).toHaveBeenCalledWith(reconocimientoData.cert_type_id);
      expect(sendRecognitionEmail).toHaveBeenCalledWith({
        to: reconocimientoData.email_persona,
        userName: mockPersona.full_name,
        certType: mockCertType.nombre,
        userRole: mockPersona.role,
        issueDate: expect.any(String),
        expiryDate: null,
        ctaUrl: null,
        currentYear: expect.any(String)
      });

      expect(result).toEqual(mockRecognition);
    });

    it('should create recognition even if email fails', async () => {
      // Mock data
      const reconocimientoData = {
        email_persona: 'test@example.com',
        cert_type_id: 1,
        meeting: 'Test Meeting'
      };

      const mockPersona = {
        email: 'test@example.com',
        full_name: 'Test User',
        role: 'Developer',
        team: 'Development'
      };

      const mockCertType = {
        id: 1,
        tipo: 'KUDOS',
        nombre: 'Test Certificate'
      };

      const mockRecognition = {
        id: 1,
        email_persona: 'test@example.com',
        cert_type_id: 1,
        meeting: 'Test Meeting',
        created_at: new Date(),
        updated_at: new Date()
      };

      // Setup mocks
      const { db } = require('../config/database');
      db.one.mockResolvedValue(mockRecognition);
      personaService.getPersonaByEmail.mockResolvedValue(mockPersona);
      certTypeService.getCertTypeById.mockResolvedValue(mockCertType);
      sendRecognitionEmail.mockRejectedValue(new Error('Email service error'));

      // Mock console.error to avoid noise in tests
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      // Execute
      const result = await reconocimientoService.createReconocimiento(reconocimientoData);

      // Assertions
      expect(result).toEqual(mockRecognition);
      expect(consoleSpy).toHaveBeenCalledWith('Error al enviar email de reconocimiento:', expect.any(Object));

      // Cleanup
      consoleSpy.mockRestore();
    });

    it('should throw error if persona not found', async () => {
      // Mock data
      const reconocimientoData = {
        email_persona: 'test@example.com',
        cert_type_id: 1,
        meeting: 'Test Meeting'
      };

      const mockRecognition = {
        id: 1,
        email_persona: 'test@example.com',
        cert_type_id: 1,
        meeting: 'Test Meeting',
        created_at: new Date(),
        updated_at: new Date()
      };

      // Setup mocks
      const { db } = require('../config/database');
      db.one.mockResolvedValue(mockRecognition);
      personaService.getPersonaByEmail.mockResolvedValue(null);

      // Execute and assert
      await expect(reconocimientoService.createReconocimiento(reconocimientoData))
        .rejects
        .toThrow('No se encontró la persona con email: test@example.com');
    });

    it('should throw error if cert type not found', async () => {
      // Mock data
      const reconocimientoData = {
        email_persona: 'test@example.com',
        cert_type_id: 1,
        meeting: 'Test Meeting'
      };

      const mockPersona = {
        email: 'test@example.com',
        full_name: 'Test User',
        role: 'Developer',
        team: 'Development'
      };

      const mockRecognition = {
        id: 1,
        email_persona: 'test@example.com',
        cert_type_id: 1,
        meeting: 'Test Meeting',
        created_at: new Date(),
        updated_at: new Date()
      };

      // Setup mocks
      const { db } = require('../config/database');
      db.one.mockResolvedValue(mockRecognition);
      personaService.getPersonaByEmail.mockResolvedValue(mockPersona);
      certTypeService.getCertTypeById.mockResolvedValue(null);

      // Execute and assert
      await expect(reconocimientoService.createReconocimiento(reconocimientoData))
        .rejects
        .toThrow('No se encontró el tipo de certificado con ID: 1');
    });
  });
}); 