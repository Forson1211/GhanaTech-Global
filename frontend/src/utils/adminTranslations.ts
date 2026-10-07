// Stable English keys keep stored business data independent of the interface language.
const rows = `
ADMIN PANEL|ESPACE ADMIN|PANEL DE ADMINISTRACIÓN
OVERVIEW|VUE D'ENSEMBLE|RESUMEN
PEOPLE & HIRING|CANDIDATS ET RECRUTEMENT|PERSONAS Y CONTRATACIÓN
WEBSITE & SETTINGS|SITE ET PARAMÈTRES|SITIO Y AJUSTES
Candidate Profiles|Profils des candidats|Perfiles de candidatos
Job Applications|Candidatures|Solicitudes de empleo
Company Requests|Demandes des entreprises|Solicitudes de empresas
Job Openings|Offres d'emploi|Ofertas de empleo
Pages & Articles|Pages et articles|Páginas y artículos
Emails & Subscribers|E-mails et abonnés|Correos y suscriptores
My Account|Mon compte|Mi cuenta
Job Categories|Catégories d'emploi|Categorías de empleo
Cost Calculator|Calculateur de coûts|Calculadora de costos
Customer Reviews|Avis clients|Opiniones de clientes
Common Questions|Questions courantes|Preguntas comunes
Homepage Numbers|Chiffres d'accueil|Cifras de inicio
Website Settings|Paramètres du site|Ajustes del sitio
Manage candidate profiles, skills, approval, and availability.|Gérez les profils, les compétences, l'approbation et la disponibilité des candidats.|Gestiona perfiles, habilidades, aprobación y disponibilidad de candidatos.
Total Candidates|Total des candidats|Total de candidatos
New Applications|Nouvelles candidatures|Nuevas solicitudes
Open Company Leads|Prospects actifs|Contactos activos
Published Services|Services publiés|Servicios publicados
Your Ghanaian talent directory|Votre annuaire de talents ghanéens|Tu directorio de talento de Ghana
Ready for your review|Prêt pour examen|Listo para revisión
Global hiring opportunities|Opportunités de recrutement mondiales|Oportunidades globales de contratación
Solutions available on your site|Solutions disponibles sur votre site|Soluciones disponibles en tu sitio
Approved candidates|Candidats approuvés|Candidatos aprobados
Applications awaiting review|Candidatures à examiner|Solicitudes pendientes
Open hiring leads|Prospects de recrutement actifs|Contactos de contratación activos
of talent pool|du vivier de talents|de la bolsa de talento
of applications|des candidatures|de las solicitudes
of company leads|des prospects|de los contactos
Services & solutions|Services et solutions|Servicios y soluciones
Technology categories|Catégories technologiques|Categorías tecnológicas
Value calculator assumptions|Hypothèses du calculateur|Supuestos de calculadora
Client testimonials|Témoignages clients|Testimonios de clientes
Homepage statistics|Statistiques d'accueil|Estadísticas de inicio
Publish|Publier|Publicar
Unpublish|Dépublier|Retirar publicación
Edit Testimonial|Modifier le témoignage|Editar testimonio
Edit Service|Modifier le service|Editar servicio
Edit Category|Modifier la catégorie|Editar categoría
Add Candidate|Ajouter un candidat|Añadir candidato
Edit Candidate|Modifier le candidat|Editar candidato
Edit Question|Modifier la question|Editar pregunta
queued|En file d'attente|En cola
sent|Envoyé au fournisseur|Enviado al proveedor
failed|Échec|Error
processing|En cours|Procesando
pending_configuration|Configuration requise|Configuración pendiente
Account Settings|Paramètres du compte|Ajustes de cuenta
Career Opportunities|Offres d'emploi|Oportunidades laborales
Website Content|Contenu du site|Contenido del sitio
Communications|Communications|Comunicaciones
Manage your profile, password, and sign-in history.|Gérez votre profil, mot de passe et historique de connexion.|Gestiona tu perfil, contraseña e historial de acceso.
Change Password|Changer le mot de passe|Cambiar contraseña
Leave password fields blank to keep your current password.|Laissez les champs vides pour conserver votre mot de passe.|Deja los campos vacíos para conservar tu contraseña.
Current Password|Mot de passe actuel|Contraseña actual
New Password|Nouveau mot de passe|Nueva contraseña
Confirm Password|Confirmer le mot de passe|Confirmar contraseña
Save Changes|Enregistrer les modifications|Guardar cambios
Recent successful sign-ins, retained for 90 days.|Connexions récentes, conservées pendant 90 jours.|Accesos recientes, conservados durante 90 días.
Date|Date|Fecha
Device|Appareil|Dispositivo
Draft, review, and publish approved information.|Préparez, vérifiez et publiez les informations approuvées.|Prepara, revisa y publica información aprobada.
Add New|Ajouter|Añadir
Search titles...|Rechercher des titres…|Buscar títulos…
Content Type|Type de contenu|Tipo de contenido
Retry|Réessayer|Reintentar
Title|Titre|Título
Category|Catégorie|Categoría
Actions|Actions|Acciones
Status|Statut|Estado
Edit|Modifier|Editar
Delete|Supprimer|Eliminar
Edit Record|Modifier le contenu|Editar registro
Technology Area|Domaine technologique|Área tecnológica
Employment Type|Type d'emploi|Tipo de empleo
Location|Lieu|Ubicación
Compensation|Rémunération|Remuneración
Description|Description|Descripción
Responsibilities (one per line)|Responsabilités (une par ligne)|Responsabilidades (una por línea)
Requirements (one per line)|Exigences (une par ligne)|Requisitos (uno por línea)
Skills (comma separated)|Compétences (séparées par des virgules)|Habilidades (separadas por comas)
Closing Date|Date limite|Fecha de cierre
URL Slug|Adresse de la page|Dirección de la página
Author / Role|Auteur / Fonction|Autor / Cargo
Summary|Résumé|Resumen
Content|Contenu|Contenido
Image URL|Adresse de l'image|Dirección de imagen
Display Order|Ordre d'affichage|Orden de visualización
Publish policies only after reviewing and approving their content.|Publiez les politiques après vérification et approbation.|Publica las políticas después de revisarlas y aprobarlas.
Cancel|Annuler|Cancelar
Delete Record|Supprimer le contenu|Eliminar registro
Delete this record permanently?|Supprimer définitivement ce contenu ?|¿Eliminar este registro permanentemente?
Confirmation messages, placement reminders, and newsletter subscribers.|Confirmations, rappels de placement et abonnés.|Confirmaciones, recordatorios y suscriptores.
Process Email Queue|Traiter les e-mails|Procesar correos
Email delivery is enabled.|L'envoi d'e-mails est activé.|El envío de correos está activado.
Email delivery needs provider configuration.|Configurez le fournisseur d'e-mails.|Configura el proveedor de correo.
Sent means accepted by the email provider. Inbox delivery is not guaranteed.|Envoyé signifie accepté par le fournisseur. La réception n'est pas garantie.|Enviado significa aceptado por el proveedor. La recepción no está garantizada.
Recent Email Messages|E-mails récents|Correos recientes
Recipient|Destinataire|Destinatario
Subject|Objet|Asunto
Attempts|Tentatives|Intentos
Newsletter Subscribers|Abonnés à la newsletter|Suscriptores
Profile saved.|Profil enregistré.|Perfil guardado.
Record saved.|Contenu enregistré.|Registro guardado.
Record deleted.|Contenu supprimé.|Registro eliminado.
Records could not be loaded.|Impossible de charger les contenus.|No se pudieron cargar los registros.
Record could not be saved.|Impossible d'enregistrer le contenu.|No se pudo guardar el registro.
Record could not be deleted.|Impossible de supprimer le contenu.|No se pudo eliminar el registro.
Your profile could not be saved.|Impossible d'enregistrer votre profil.|No se pudo guardar tu perfil.
Sign-in history could not be loaded.|Impossible de charger les connexions.|No se pudo cargar el historial.
Use at least 12 characters, confirm the password, and enter your current password.|Utilisez 12 caractères minimum, confirmez et saisissez votre mot de passe actuel.|Usa al menos 12 caracteres, confirma e introduce tu contraseña actual.
Communications could not be loaded.|Impossible de charger les communications.|No se pudieron cargar las comunicaciones.
Email queue processed.|File d'e-mails traitée.|Cola de correo procesada.
Email processing failed.|Le traitement des e-mails a échoué.|Error al procesar los correos.
No records found|Aucun résultat|No hay registros
Try adjusting your search or filters.|Modifiez votre recherche ou vos filtres.|Cambia tu búsqueda o filtros.
All|Tous|Todos
Available|Disponible|Disponible
Unavailable|Indisponible|No disponible
Pending|En attente|Pendiente
Approved|Approuvé|Aprobado
Rejected|Refusé|Rechazado
Applied|Candidature reçue|Solicitud recibida
Screening|Présélection|Preselección
Technical Assessment|Évaluation technique|Evaluación técnica
Interview|Entretien|Entrevista
Verified|Vérifié|Verificado
Talent Pool|Vivier de talents|Bolsa de talento
Presented|Présenté|Presentado
Client Interview|Entretien client|Entrevista con cliente
Selected|Sélectionné|Seleccionado
Placed|Placé|Contratado
New|Nouveau|Nuevo
Reviewing|En cours d'examen|En revisión
Shortlisted|Présélectionné|Preseleccionado
Accepted|Accepté|Aceptado
Contacted|Contacté|Contactado
Discovery Scheduled|Découverte planifiée|Descubrimiento programado
Qualified|Qualifié|Cualificado
Job Requirement Received|Besoin reçu|Requisito recibido
Candidates Presented|Candidats présentés|Candidatos presentados
Client Interviews|Entretiens clients|Entrevistas con clientes
Offer|Offre|Oferta
Closed Won|Conclu avec succès|Cerrado ganado
Closed Lost|Conclu sans succès|Cerrado perdido
Proposal|Proposition|Propuesta
Closed|Clôturé|Cerrado
Interviewing|En entretien|En entrevista
published|Publié|Publicado
draft|Brouillon|Borrador
closed|Clôturé|Cerrado
leadership|Direction|Dirección
insight|Article|Artículo
privacy|Confidentialité|Privacidad
terms|Conditions|Condiciones
Full-time|Temps plein|Tiempo completo
Part-time|Temps partiel|Tiempo parcial
Contract|Contrat|Contrato
Project|Projet|Proyecto
Managed team|Équipe dédiée|Equipo gestionado
Company|Entreprise|Empresa
Experience|Expérience|Experiencia
Availability|Disponibilité|Disponibilidad
Order|Ordre|Orden
Reorder|Réorganiser|Reordenar
Move Up|Monter|Subir
Move Down|Descendre|Bajar
Save Candidate|Enregistrer le candidat|Guardar candidato
Add New Candidate|Ajouter un candidat|Añadir candidato
Candidate Management|Gestion des candidats|Gestión de candidatos
Maintain technical talent profiles, approve applications, and assign statuses.|Gérez les profils, approuvez les candidatures et attribuez les statuts.|Gestiona perfiles, aprueba solicitudes y asigna estados.
First Name|Prénom|Nombre
Last Name|Nom de famille|Apellido
Professional Headline|Titre professionnel|Título profesional
Years Experience|Années d'expérience|Años de experiencia
Years|Années|Años
Skills (comma-separated)|Compétences (séparées par des virgules)|Habilidades (separadas por comas)
Bio / Summary|Biographie / Résumé|Biografía / Resumen
Profile Status|Statut du profil|Estado del perfil
Vetting Status|Statut de vérification|Estado de verificación
Approve|Approuver|Aprobar
Reject|Refuser|Rechazar
Download CV|Télécharger le CV|Descargar CV
View Details|Voir les détails|Ver detalles
Applicant|Candidat|Solicitante
Received|Reçu|Recibido
Pipeline Status|Statut du parcours|Estado del proceso
Review incoming talent submissions, view CVs, and log recruiter internal notes.|Examinez les candidatures, consultez les CV et consignez vos notes.|Revisa solicitudes, consulta CV y registra notas internas.
Recruiter Internal Notes (Confidential)|Notes internes (confidentielles)|Notas internas (confidenciales)
Save Internal Notes|Enregistrer les notes|Guardar notas
Attached Resume / CV File|CV joint|CV adjunto
Open / Download Document|Ouvrir / Télécharger|Abrir / Descargar
No File|Aucun fichier|Sin archivo
Talent Pipeline History|Historique du parcours|Historial del proceso
Company Leads & Inquiries|Prospects et demandes|Contactos y consultas
Track inbound hiring requests from U.S. technology leaders and enterprise buyers.|Suivez les demandes de recrutement des entreprises.|Gestiona las solicitudes de contratación de empresas.
Company & Contact|Entreprise et contact|Empresa y contacto
Need & Role|Besoin et poste|Necesidad y puesto
Headcount & Type|Effectif et type|Cantidad y tipo
Notes & Details|Notes et détails|Notas y detalles
Message / Requirements|Message / Besoins|Mensaje / Requisitos
Job Description|Description du poste|Descripción del puesto
Discovery Call|Appel de découverte|Llamada de descubrimiento
Placement Date|Date de placement|Fecha de contratación
Placement Follow-ups|Suivis de placement|Seguimientos de contratación
Pipeline History|Historique du parcours|Historial del proceso
Internal Deal Notes|Notes internes|Notas internas
Save Deal Notes|Enregistrer les notes|Guardar notas
Services Management|Gestion des services|Gestión de servicios
Publish, edit, and configure managed service offerings and capability items.|Publiez et configurez les services et compétences.|Publica y configura los servicios y capacidades.
Add Managed Service|Ajouter un service|Añadir servicio
Service Title|Titre du service|Título del servicio
Service Description|Description du service|Descripción del servicio
Capabilities|Compétences|Capacidades
Capabilities (one per line)|Compétences (une par ligne)|Capacidades (una por línea)
Save Service|Enregistrer le service|Guardar servicio
Publish Status|Statut de publication|Estado de publicación
Calculator Management|Gestion du calculateur|Gestión de calculadora
Edit role salary baselines. Admin updates immediately affect the public value calculator.|Modifiez les salaires de référence utilisés par le calculateur public.|Modifica los salarios de referencia de la calculadora pública.
Add Role Baseline|Ajouter une référence|Añadir referencia
Role Title|Titre du poste|Título del puesto
Seniority Baseline|Niveau d'expérience|Nivel de experiencia
U.S. Estimated Annual Cost ($)|Coût annuel estimé aux États-Unis ($)|Coste anual estimado en EE. UU. ($)
GhanaTech Estimated Annual Cost ($)|Coût annuel estimé GhanaTech ($)|Coste anual estimado GhanaTech ($)
Estimated U.S. Cost|Coût estimé aux États-Unis|Coste estimado en EE. UU.
GhanaTech Cost|Coût GhanaTech|Coste GhanaTech
Annual Savings|Économies annuelles|Ahorro anual
Edit Baseline|Modifier la référence|Editar referencia
Save Assumptions|Enregistrer les hypothèses|Guardar supuestos
Add Category|Ajouter une catégorie|Añadir categoría
Category Name|Nom de la catégorie|Nombre de categoría
Discipline|Domaine|Área
Save Category|Enregistrer la catégorie|Guardar categoría
Manage the 4 primary technology domains and catalog classifications.|Gérez les domaines technologiques et les catégories.|Gestiona las áreas tecnológicas y categorías.
FAQ Management|Gestion des FAQ|Gestión de preguntas frecuentes
Edit questions and answers displayed in the public accordion.|Modifiez les questions et réponses du site.|Edita las preguntas y respuestas del sitio.
Add FAQ Question|Ajouter une question|Añadir pregunta
Question|Question|Pregunta
Answer|Réponse|Respuesta
Question & Answer|Question et réponse|Pregunta y respuesta
Save Question|Enregistrer la question|Guardar pregunta
Testimonials Management|Gestion des témoignages|Gestión de testimonios
Manage demo feedback and client reviews displayed in the homepage carousel.|Gérez les témoignages affichés sur la page d'accueil.|Gestiona los testimonios de la página de inicio.
Add Testimonial|Ajouter un témoignage|Añadir testimonio
Client Name|Nom du client|Nombre del cliente
Role / Title|Fonction / Titre|Cargo / Título
Company Name & Location|Entreprise et lieu|Empresa y ubicación
Quote / Feedback|Citation / Témoignage|Cita / Testimonio
Quote Snippet|Extrait|Extracto
Save Testimonial|Enregistrer le témoignage|Guardar testimonio
Site & Platform Settings|Paramètres du site|Ajustes del sitio
Configure platform branding, contact destinations, and operational parameters.|Configurez l'identité, les contacts et les paramètres.|Configura la identidad, contactos y parámetros.
General Information|Informations générales|Información general
Company Name|Nom de l'entreprise|Nombre de empresa
Tagline|Slogan|Eslogan
Notification Inbound Email|E-mail de notification|Correo de notificaciones
Contact Phone|Téléphone de contact|Teléfono de contacto
Ghana Office Location|Adresse au Ghana|Dirección en Ghana
U.S. Representation Location|Adresse aux États-Unis|Dirección en EE. UU.
Social Links|Réseaux sociaux|Redes sociales
Operational Flags|Options opérationnelles|Opciones operativas
Enable Public Candidate Applications (/join-talent)|Activer les candidatures (/join-talent)|Activar solicitudes (/join-talent)
Enable Inbound Company Leads (/hire-talent)|Activer les demandes (/hire-talent)|Activar consultas (/hire-talent)
Save Platform Settings|Enregistrer les paramètres|Guardar ajustes
Key Statistics|Statistiques clés|Estadísticas clave
Talent Management|Gestion des talents|Gestión de talento
Connecting exceptional Ghanaian talent with global opportunities.|Relier les talents ghanéens aux opportunités mondiales.|Conectamos talento de Ghana con oportunidades globales.
Export Report|Exporter le rapport|Exportar informe
Live talent directory|Annuaire des talents|Directorio de talento
View Directory|Voir l'annuaire|Ver directorio
View All|Tout voir|Ver todo
Recent Talent Applications|Candidatures récentes|Solicitudes recientes
Talent Pool Overview|Vue des talents|Resumen de talento
Current candidate availability across your talent pipeline.|Disponibilité actuelle des candidats.|Disponibilidad actual de candidatos.
Review Applications|Examiner les candidatures|Revisar solicitudes
Review new applicants and help skilled professionals take their next career step.|Examinez les candidatures et accompagnez les professionnels.|Revisa solicitudes y ayuda a los profesionales.
Manage applications|Gérer les candidatures|Gestionar solicitudes
Review talent profiles|Examiner les profils|Revisar perfiles
Platform Management|Gestion de la plateforme|Gestión de plataforma
Talent Approval Rate|Taux d'approbation|Tasa de aprobación
Approved profiles in your talent directory|Profils approuvés dans votre annuaire|Perfiles aprobados en tu directorio
Total applications|Total des candidatures|Total de solicitudes
total candidates|candidats au total|candidatos en total
approved|approuvés|aprobados
pending|en attente|pendientes
Homepage Statistics|Statistiques d'accueil|Estadísticas de inicio
Edit trust metrics shown on the public landing page (Section 11 & 39).|Modifiez les statistiques de la page d'accueil.|Edita las estadísticas de la página de inicio.
Update Statistic|Modifier la statistique|Actualizar estadística
Displayed Value (e.g. 100+)|Valeur affichée (ex. 100+)|Valor mostrado (ej. 100+)
Label Description (e.g. Technology Professionals)|Description (ex. Professionnels technologiques)|Descripción (ej. Profesionales tecnológicos)
Subtext / Details|Sous-titre / Détails|Subtítulo / Detalles
All Application Statuses|Tous les statuts de candidature|Todos los estados de solicitud
All Availability|Toutes les disponibilités|Todas las disponibilidades
All Disciplines|Tous les domaines|Todas las áreas
All Lead Statuses|Tous les statuts de prospect|Todos los estados de contacto
All Statuses|Tous les statuts|Todos los estados
Search applicant by name, email, or role...|Rechercher par nom, e-mail ou poste…|Buscar por nombre, correo o puesto…
Search candidate by name, role, skill...|Rechercher par nom, poste ou compétence…|Buscar por nombre, puesto o habilidad…
Search lead by company, contact name, or role...|Rechercher par entreprise, nom ou poste…|Buscar por empresa, nombre o puesto…
Try again|Réessayer|Reintentar
Success|Succès|Éxito
Error|Erreur|Error
Notice|Information|Información
Role & Discipline|Poste et domaine|Puesto y área
Target Role & Area|Poste et domaine ciblés|Puesto y área objetivo
Client & Role|Client et poste|Cliente y puesto
Application Pipeline|Parcours des candidatures|Proceso de solicitudes
Target Budget|Budget cible|Presupuesto objetivo
CV Resume|CV|CV
Phone|Téléphone|Teléfono
Required Skills|Compétences requises|Habilidades requeridas
Experience Level|Niveau d'expérience|Nivel de experiencia
Company Size|Taille de l'entreprise|Tamaño de empresa
Employment Status|Situation professionnelle|Situación laboral
Employment Preferences|Préférences d'emploi|Preferencias de empleo
Education|Formation|Educación
Certifications|Certifications|Certificaciones
Authorization|Autorisation|Autorización
Applicant Name|Nom du candidat|Nombre del solicitante
Applied|Candidature reçue|Solicitud recibida
Received|Reçu|Recibido
Contact Email|E-mail de contact|Correo de contacto
Desired Start|Début souhaité|Inicio deseado
Declared Skills|Compétences déclarées|Habilidades declaradas
Client Representative|Représentant du client|Representante del cliente
Company Name|Nom de l'entreprise|Nombre de empresa
Role / Area|Poste / Domaine|Puesto / Área
Role / Quantity|Poste / Effectif|Puesto / Cantidad
Experience & Availability|Expérience et disponibilité|Experiencia y disponibilidad
Key|Clé|Clave
Delete Application|Supprimer la candidature|Eliminar solicitud
Delete Calculator Role|Supprimer le poste|Eliminar puesto
Delete Candidate Record|Supprimer le candidat|Eliminar candidato
Delete Category|Supprimer la catégorie|Eliminar categoría
Delete Company Lead|Supprimer le prospect|Eliminar contacto
Delete FAQ|Supprimer la question|Eliminar pregunta
Delete Lead|Supprimer le prospect|Eliminar contacto
Delete Role|Supprimer le poste|Eliminar puesto
Delete Service|Supprimer le service|Eliminar servicio
Delete Testimonial|Supprimer le témoignage|Eliminar testimonio
`;
export const adminTranslations: Record<'fr' | 'es', Record<string, string>> = { fr: {}, es: {} };
for (const row of rows.trim().split('\n')) {
  const [key, fr, es] = row.split('|');
  adminTranslations.fr[key] = fr; adminTranslations.es[key] = es;
}
