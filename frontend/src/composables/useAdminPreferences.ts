import { ref } from 'vue';
import { adminTranslations } from '@/utils/adminTranslations';
const translations = {
  fr: { Dashboard: 'Tableau de bord', Talent: 'Talents', Services: 'Services', 'View site': 'Voir le site', 'View Profile': 'Voir le profil', 'Account Setting': 'Parametres du compte', 'Login Activity': 'Activite de connexion', 'Dark Mode': 'Mode sombre', 'Sign Out': 'Deconnexion', Notifications: 'Notifications', Language: 'Langue', 'ADMIN WORKSPACE': 'ESPACE ADMIN', 'DASHBOARD': 'TABLEAU DE BORD', 'TALENT & PIPELINE': 'TALENTS ET RECRUTEMENT', 'CONTENT & PLATFORM': 'CONTENU ET PLATEFORME', 'Overview Dashboard': 'Vue generale', 'Talent Directory': 'Annuaire des talents', 'Talent Applications': 'Candidatures', 'Company Leads': 'Prospects entreprises', 'Technology Categories': 'Categories technologiques', 'Value Calculator': 'Calculateur de valeur', Testimonials: 'Temoignages', FAQs: 'Questions frequentes', 'Homepage Statistics': 'Statistiques du site', 'Site Settings': 'Parametres du site', 'Your Profile': 'Votre profil', Name: 'Nom', Email: 'E-mail', Role: 'Role', Close: 'Fermer', 'Last successful sign-in': 'Derniere connexion reussie', 'No sign-in timestamp is available.': 'Aucune date de connexion disponible.', 'No pending reviews.': 'Aucun examen en attente.', 'Unable to load notifications.': 'Impossible de charger les notifications.', 'New applications': 'Nouvelles candidatures', 'Open company leads': 'Prospects actifs' },
  es: { Dashboard: 'Panel', Talent: 'Talento', Services: 'Servicios', 'View site': 'Ver sitio', 'View Profile': 'Ver perfil', 'Account Setting': 'Ajustes de cuenta', 'Login Activity': 'Actividad de acceso', 'Dark Mode': 'Modo oscuro', 'Sign Out': 'Cerrar sesion', Notifications: 'Notificaciones', Language: 'Idioma', 'ADMIN WORKSPACE': 'ESPACIO ADMIN', 'DASHBOARD': 'PANEL', 'TALENT & PIPELINE': 'TALENTO Y SELECCION', 'CONTENT & PLATFORM': 'CONTENIDO Y PLATAFORMA', 'Overview Dashboard': 'Vista general', 'Talent Directory': 'Directorio de talento', 'Talent Applications': 'Solicitudes', 'Company Leads': 'Contactos empresariales', 'Technology Categories': 'Categorias tecnologicas', 'Value Calculator': 'Calculadora de valor', Testimonials: 'Testimonios', FAQs: 'Preguntas frecuentes', 'Homepage Statistics': 'Estadisticas del sitio', 'Site Settings': 'Ajustes del sitio', 'Your Profile': 'Tu perfil', Name: 'Nombre', Email: 'Correo', Role: 'Rol', Close: 'Cerrar', 'Last successful sign-in': 'Ultimo acceso correcto', 'No sign-in timestamp is available.': 'No hay fecha de acceso disponible.', 'No pending reviews.': 'No hay revisiones pendientes.', 'Unable to load notifications.': 'No se pudieron cargar las notificaciones.', 'New applications': 'Nuevas solicitudes', 'Open company leads': 'Contactos activos' },
} as const;
export type AdminLanguage = 'en' | keyof typeof translations;
const savedLanguage = localStorage.getItem('gtg_admin_language');
const language = ref<AdminLanguage>(savedLanguage === 'fr' || savedLanguage === 'es' ? savedLanguage : 'en');
const darkMode = ref(localStorage.getItem('gtg_admin_dark') === 'true');
export function useAdminPreferences() {
  const t = (text: string): string => {
    if (language.value === 'en') return text;
    const dictionary = { ...adminTranslations[language.value], ...translations[language.value] } as Record<string,string>;
    if (dictionary[text]) return dictionary[text];
    if (text.endsWith(':')) return (dictionary[text.slice(0,-1)] || text.slice(0,-1)) + ':';
    return text;
  };
  const setLanguage = (value: AdminLanguage) => { language.value = value; localStorage.setItem('gtg_admin_language', value); };
  const toggleDarkMode = () => { darkMode.value = !darkMode.value; localStorage.setItem('gtg_admin_dark', String(darkMode.value)); };
  return { language, darkMode, t, setLanguage, toggleDarkMode };
}
