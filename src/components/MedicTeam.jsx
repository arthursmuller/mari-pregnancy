import React, { useEffect, useState } from 'react';
import { PRENATAL_CARE_TEAM_AND_SCHEDULE } from '../data';

/**
 * MedicTeam component renders information about the professionals
 * involved in prenatal care, allows the mother to store contact
 * details and keep records of exams or notes related to each
 * specialist.  Data persists in localStorage so that user input is
 * retained across sessions.
 */
export default function MedicTeam() {
  const specialists = PRENATAL_CARE_TEAM_AND_SCHEDULE.specialists;
  const [contacts, setContacts] = useState({});
  const [records, setRecords] = useState({});
  const [formState, setFormState] = useState({});
  const [recordForm, setRecordForm] = useState({});
  // Flag to avoid persisting default empty state before initial
  // loading from localStorage completes.  Without this, the first
  // render will write empty objects to localStorage and erase saved
  // data (similar to the tasks context issue).
  const [loaded, setLoaded] = useState(false);

  // Version constant for seeding medic contacts and records.  Increment
  // this number if the default structure or initial values change.  If
  // the stored version differs from this, localStorage will be reset
  // to an empty object on first load.
  const MEDIC_SEED_VERSION = 1;

  // Load stored data on mount
  useEffect(() => {
    // Contacts
    try {
      const savedContacts = localStorage.getItem('medicContacts');
      const savedContactsSeed = localStorage.getItem('medicContactsSeed');
      if (
        savedContactsSeed &&
        parseInt(savedContactsSeed, 10) === MEDIC_SEED_VERSION &&
        savedContacts
      ) {
        setContacts(JSON.parse(savedContacts));
      } else {
        // Reset to empty and record the seed version
        setContacts({});
        localStorage.setItem('medicContacts', JSON.stringify({}));
        localStorage.setItem('medicContactsSeed', MEDIC_SEED_VERSION.toString());
      }
    } catch (e) {
      setContacts({});
      try {
        localStorage.setItem('medicContacts', JSON.stringify({}));
        localStorage.setItem('medicContactsSeed', MEDIC_SEED_VERSION.toString());
      } catch (_) {
        /* ignore */
      }
    }
    // Records
    try {
      const savedRecords = localStorage.getItem('medicRecords');
      const savedRecordsSeed = localStorage.getItem('medicRecordsSeed');
      if (
        savedRecordsSeed &&
        parseInt(savedRecordsSeed, 10) === MEDIC_SEED_VERSION &&
        savedRecords
      ) {
        setRecords(JSON.parse(savedRecords));
      } else {
        setRecords({});
        localStorage.setItem('medicRecords', JSON.stringify({}));
        localStorage.setItem('medicRecordsSeed', MEDIC_SEED_VERSION.toString());
      }
    } catch (e) {
      setRecords({});
      try {
        localStorage.setItem('medicRecords', JSON.stringify({}));
        localStorage.setItem('medicRecordsSeed', MEDIC_SEED_VERSION.toString());
      } catch (_) {
        /* ignore */
      }
    }
    // Indicate that initial loading has finished.  Persistence
    // effects will use this flag to avoid writing initial empty
    // objects back to storage.
    setLoaded(true);
  }, []);

  // Save to localStorage whenever contacts or records change.  Wait
  // until the initial load completes to avoid writing the empty
  // initial state back to storage and thereby clearing saved data.
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem('medicContacts', JSON.stringify(contacts));
    } catch (e) {
      /* ignore */
    }
  }, [contacts, loaded]);
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem('medicRecords', JSON.stringify(records));
    } catch (e) {
      /* ignore */
    }
  }, [records, loaded]);

  const handleContactChange = (role, field, value) => {
    setContacts((prev) => ({
      ...prev,
      [role]: { ...prev[role], [field]: value },
    }));
  };

  const handleRecordSubmit = (role) => {
    const entry = recordForm[role];
    if (!entry || !entry.name) return;
    setRecords((prev) => ({
      ...prev,
      [role]: [...(prev[role] || []), { ...entry, id: Date.now() }],
    }));
    setRecordForm((prev) => ({ ...prev, [role]: { name: '', date: '', notes: '' } }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-4">Equipe Médica</h2>
      <p className="text-sm text-gray-700 mb-4">
        Adicione informações de contato e registre exames ou notas
        importantes para cada profissional. Os dados ficam armazenados
        localmente no seu navegador.
      </p>
      <div className="space-y-6">
        {specialists.map((spec) => {
          const role = spec.role;
          const contact = contacts[role] || { nome: '', telefone: '', email: '' };
          const recs = records[role] || [];
          const entry = recordForm[role] || { name: '', date: '', notes: '' };
          return (
            <div key={role} className="bg-white shadow rounded-lg p-4">
              <h3 className="text-lg font-semibold text-primary mb-2">{role}</h3>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Importância:</strong> {spec.importance}
              </p>
              {spec.frequency && (
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Frequência:</strong> {spec.frequency}
                </p>
              )}
              {spec.key_actions && (
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Ações:</strong> {spec.key_actions}
                </p>
              )}
              {spec.expected_visits && (
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Visitas esperadas:</strong> {spec.expected_visits.join(', ')}
                </p>
              )}
              {spec.expected_visit && (
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Visita esperada:</strong> {spec.expected_visit}
                </p>
              )}
              {spec.expected_start && (
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Início esperado:</strong> {spec.expected_start}
                </p>
              )}
              {/* Contact inputs */}
              <div className="border-t border-gray-200 mt-3 pt-3">
                <h4 className="font-semibold text-primary mb-2">Contato</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Nome"
                    value={contact.nome}
                    onChange={(e) => handleContactChange(role, 'nome', e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Telefone"
                    value={contact.telefone}
                    onChange={(e) => handleContactChange(role, 'telefone', e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={contact.email}
                    onChange={(e) => handleContactChange(role, 'email', e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  />
                </div>
              </div>
              {/* Exam record form */}
              <div className="border-t border-gray-200 mt-3 pt-3">
                <h4 className="font-semibold text-primary mb-2">Registrar exame/nota</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Nome do exame ou nota"
                    value={entry.name}
                    onChange={(e) =>
                      setRecordForm((prev) => ({
                        ...prev,
                        [role]: { ...entry, name: e.target.value },
                      }))
                    }
                    className="border rounded px-2 py-1 text-sm"
                  />
                  <input
                    type="date"
                    value={entry.date}
                    onChange={(e) =>
                      setRecordForm((prev) => ({
                        ...prev,
                        [role]: { ...entry, date: e.target.value },
                      }))
                    }
                    className="border rounded px-2 py-1 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Observações"
                    value={entry.notes}
                    onChange={(e) =>
                      setRecordForm((prev) => ({
                        ...prev,
                        [role]: { ...entry, notes: e.target.value },
                      }))
                    }
                    className="border rounded px-2 py-1 text-sm"
                  />
                </div>
                <button
                  onClick={() => handleRecordSubmit(role)}
                  className="mt-2 px-3 py-1 bg-primary text-white rounded text-sm hover:bg-primary-dark"
                >
                  Salvar
                </button>
              </div>
              {/* Records list */}
              {recs.length > 0 && (
                <div className="border-t border-gray-200 mt-3 pt-3">
                  <h4 className="font-semibold text-primary mb-2">Registros</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    {recs.map((r) => (
                      <li key={r.id}>
                        {r.date ? (
                          <span className="mr-2 text-gray-500">{r.date}:</span>
                        ) : null}
                        <span className="font-semibold">{r.name}</span>
                        {r.notes && <span className="ml-1">– {r.notes}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}