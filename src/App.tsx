import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home as HomeIcon, 
  Languages, 
  User, 
  Flame, 
  Trophy, 
  Play, 
  Check, 
  Lock, 
  Gift, 
  ChevronRight,
  Volume2,
  X,
  Heart,
  Lightbulb,
  ArrowRight,
  Award,
  Zap,
  Calendar,
  Globe,
  Verified,
  School,
  Users,
  Settings,
  Bell,
  Target,
  Plus,
  Camera,
  LogOut,
  RefreshCw,
  BookOpen,
  LogIn
} from 'lucide-react';
import { cn } from './utils';
import { Screen, Letter, Unit, Lesson, UserProfile, UserProgress, WordExample } from './types';
import { ARABIC_LETTERS, UNITS } from './constants';
import { playArabic } from './services/ttsService';
import { auth, db, googleProvider, signInWithPopup, signOut, doc, getDoc, setDoc, onSnapshot } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

// --- Error Handling ---

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// --- Types & Defaults ---

const DEFAULT_PROFILE: UserProfile = {
  name: '',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  notificationHour: 20,
  dailyGoal: 5,
  weeklyGoal: 25
};

const INITIAL_PROGRESS: UserProgress = {
  xp: 0,
  streak: 0,
  completedLessons: [],
  masteredLetters: [],
  masteredWords: [],
  lastActiveDate: new Date().toISOString().split('T')[0]
};

// --- Components ---

const LoginScreen = ({ onLogin }: { onLogin: () => void }) => {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 text-center pt-safe pb-safe">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <div className="w-24 h-24 bg-primary-container rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-primary/10">
          <School className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-4xl font-black text-on-surface mb-4 font-headline">Alif Academy</h1>
        <p className="text-on-surface-variant mb-12">Master Arabic letters and track your progress across all your devices.</p>
        
        <button 
          onClick={onLogin}
          className="w-full py-5 bg-primary text-white rounded-2xl font-black text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-95 transition-all"
        >
          <LogIn className="w-6 h-6" />
          SIGN IN WITH GOOGLE
        </button>
        
        <p className="mt-8 text-[10px] uppercase font-bold tracking-widest text-on-surface-variant opacity-60">
          Your progress will be saved automatically
        </p>
      </motion.div>
    </div>
  );
};

const OnboardingScreen = ({ onComplete }: { onComplete: (profile: UserProfile) => void }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);

  const avatars = [
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Sawyer',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Jocelyn',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Max',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Luna'
  ];

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 pt-[calc(var(--spacing-safe-top)+2rem)] pb-safe text-center">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="max-w-md w-full"
          >
            <div className="w-20 h-20 bg-primary-container rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Languages className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl font-black text-on-surface mb-4">Welcome to Alif Academy</h1>
            <p className="text-on-surface-variant mb-12">Let's start your Arabic journey. What should we call you?</p>
            <input 
              type="text"
              placeholder="Your Name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full p-4 rounded-2xl bg-surface-container border-2 border-transparent focus:border-primary outline-none text-lg font-bold text-center mb-8"
            />
            <button 
              disabled={!profile.name}
              onClick={() => setStep(2)}
              className="w-full py-4 bg-primary text-white rounded-full font-black text-lg shadow-lg shadow-primary/20 disabled:opacity-50 transition-all active:scale-95"
            >
              CONTINUE
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="max-w-md w-full"
          >
            <h1 className="text-3xl font-black text-on-surface mb-4">Choose your avatar</h1>
            <p className="text-on-surface-variant mb-8">Pick a face for your profile.</p>
            <div className="grid grid-cols-3 gap-4 mb-12">
              {avatars.map((av) => (
                <button 
                  key={av}
                  onClick={() => setProfile({ ...profile, avatar: av })}
                  className={cn(
                    "w-full aspect-square rounded-2xl overflow-hidden border-4 transition-all",
                    profile.avatar === av ? "border-primary bg-primary-container" : "border-transparent bg-surface-container"
                  )}
                >
                  <img src={av} alt="Avatar" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <button 
              onClick={() => setStep(3)}
              className="w-full py-4 bg-primary text-white rounded-full font-black text-lg shadow-lg shadow-primary/20 transition-all active:scale-95"
            >
              NEXT
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="max-w-md w-full"
          >
            <Bell className="w-16 h-16 text-secondary mx-auto mb-6" />
            <h1 className="text-3xl font-black text-on-surface mb-4">Daily Reminders</h1>
            <p className="text-on-surface-variant mb-8">Consistency is key to learning Arabic. When should we remind you?</p>
            
            <div className="flex flex-col gap-4 mb-12">
              <div className="flex items-center justify-between p-4 bg-surface-container rounded-2xl">
                <span className="font-bold">Enable Notifications</span>
                <button 
                  onClick={() => setProfile({ ...profile, notificationHour: profile.notificationHour === null ? 20 : null })}
                  className={cn(
                    "w-12 h-6 rounded-full relative transition-colors",
                    profile.notificationHour !== null ? "bg-primary" : "bg-outline"
                  )}
                >
                  <div className={cn(
                    "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                    profile.notificationHour !== null ? "left-7" : "left-1"
                  )} />
                </button>
              </div>
              
              {profile.notificationHour !== null && (
                <div className="p-4 bg-surface-container rounded-2xl">
                  <p className="text-xs font-bold text-on-surface-variant mb-2 uppercase tracking-widest">Select Hour</p>
                  <input 
                    type="range" 
                    min="0" 
                    max="23" 
                    value={profile.notificationHour}
                    onChange={(e) => setProfile({ ...profile, notificationHour: parseInt(e.target.value) })}
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between mt-2 font-bold text-primary">
                    <span>{profile.notificationHour}:00</span>
                    <span>{profile.notificationHour >= 12 ? 'PM' : 'AM'}</span>
                  </div>
                </div>
              )}
            </div>

            <button 
              onClick={() => onComplete(profile)}
              className="w-full py-4 bg-primary text-white rounded-full font-black text-lg shadow-lg shadow-primary/20 transition-all active:scale-95"
            >
              GET STARTED
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Sidebar = ({ currentScreen, setScreen, profile, progress }: { currentScreen: Screen, setScreen: (s: Screen) => void, profile: UserProfile, progress: UserProgress }) => {
  const navItems = [
    { id: 'home', icon: HomeIcon, label: 'Home' },
    { id: 'practice', icon: Target, label: 'Practice' },
    { id: 'letters', icon: Languages, label: 'Alphabet' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <aside className="fixed left-0 top-0 hidden md:flex flex-col p-4 z-40 h-screen w-64 bg-surface shadow-xl pt-20">
      <div className="px-4 mb-8">
        <h2 className="text-xl font-black text-primary font-headline">Alif Academy</h2>
        <p className="text-sm text-on-surface-variant font-medium">Level {Math.floor(progress.xp / 100) + 1} Explorer</p>
      </div>
      <nav className="flex flex-col gap-2 flex-grow">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setScreen(item.id as Screen)}
            className={cn(
              "flex items-center px-4 py-3 gap-3 rounded-2xl transition-all active:scale-[0.98] duration-150 font-headline font-semibold text-base",
              currentScreen === item.id 
                ? "bg-primary-container text-on-primary-container" 
                : "text-on-surface-variant hover:bg-surface-container-highest"
            )}
          >
            <item.icon className={cn("w-5 h-5", currentScreen === item.id && "fill-current")} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="mt-auto p-4 bg-surface-container-low rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center">
            <Zap className="w-5 h-5 text-on-primary-container fill-current" />
          </div>
          <div>
            <p className="text-xs font-bold text-on-surface">Daily Goal</p>
            <p className="text-[10px] text-on-surface-variant">{progress.masteredLetters.length}/{profile.dailyGoal} Letters</p>
          </div>
        </div>
        <button 
          onClick={() => setScreen('home')}
          className="w-full py-4 bg-gradient-to-r from-primary to-primary-container text-white rounded-full font-bold shadow-lg shadow-primary/20 active:scale-95 transition-transform"
        >
          Continue Learning
        </button>
      </div>
    </aside>
  );
};

const BottomNav = ({ currentScreen, setScreen }: { currentScreen: Screen, setScreen: (s: Screen) => void }) => {
  const navItems = [
    { id: 'home', icon: HomeIcon, label: 'Home' },
    { id: 'practice', icon: Target, label: 'Practice' },
    { id: 'letters', icon: Languages, label: 'Alphabet' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface/95 backdrop-blur-xl border-t border-outline-variant/10 z-[60] pb-safe px-4 sm:px-8">
      <div className="h-16 sm:h-20 flex justify-around items-center">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setScreen(item.id as Screen)}
            className={cn(
              "flex flex-col items-center gap-1 transition-all flex-1 py-2",
              currentScreen === item.id ? "text-primary" : "text-on-surface-variant"
            )}
          >
            <item.icon className={cn("w-6 h-6 sm:w-7 sm:h-7", currentScreen === item.id && "fill-current")} />
            <span className="text-[10px] sm:text-[11px] font-bold">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

const TopBar = ({ profile, progress, onOpenDashboard }: { profile: UserProfile, progress: UserProgress, onOpenDashboard: () => void }) => {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant pt-safe px-4 sm:px-8">
      <div className="h-14 sm:h-16 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="text-lg sm:text-xl font-black text-primary tracking-tight font-headline">Alif Academy</span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenDashboard}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container rounded-full hover:bg-surface-container-high transition-colors"
          >
            <Flame className="w-4 h-4 text-orange-500 fill-current" />
            <span className="font-bold text-on-surface text-xs">{progress.streak}</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-primary font-black text-xs sm:text-sm">{progress.xp} XP</span>
            <button 
              onClick={() => onOpenDashboard()}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-container flex items-center justify-center overflow-hidden border-2 border-primary/20"
            >
              <img 
                src={profile.avatar} 
                alt={profile.name} 
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const DashboardScreen = ({ profile, progress, setProfile }: { profile: UserProfile, progress: UserProgress, setProfile: (p: UserProfile) => void }) => {
  const dailyProgress = Math.min(100, (progress.masteredLetters.length / profile.dailyGoal) * 100);
  
  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-black mb-8">Your Learning Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-primary-container p-6 rounded-3xl text-on-primary-container">
          <div className="flex justify-between items-start mb-4">
            <Target className="w-8 h-8" />
            <span className="text-xs font-black uppercase tracking-widest opacity-70">Daily Goal</span>
          </div>
          <h3 className="text-2xl font-black mb-1">{progress.masteredLetters.length} / {profile.dailyGoal} Letters</h3>
          <p className="text-sm opacity-80 mb-6">You're doing great! Keep it up.</p>
          <div className="w-full h-3 bg-white/30 rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-500" style={{ width: `${dailyProgress}%` }}></div>
          </div>
        </div>

        <div className="bg-surface-container p-6 rounded-3xl border border-outline-variant">
          <div className="flex justify-between items-start mb-4">
            <Settings className="w-8 h-8 text-on-surface-variant" />
            <span className="text-xs font-black uppercase tracking-widest text-on-surface-variant">Adjust Goals</span>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-on-surface-variant block mb-2 uppercase">Daily Letter Goal</label>
              <div className="flex items-center gap-4">
                <input 
                  type="range" min="1" max="28" value={profile.dailyGoal}
                  onChange={(e) => setProfile({ ...profile, dailyGoal: parseInt(e.target.value) })}
                  className="flex-1 accent-primary"
                />
                <span className="font-black text-primary w-8">{profile.dailyGoal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-black mb-6 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Weekly Progress
        </h2>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-3xl p-6">
          <div className="flex justify-between items-end h-32 gap-2">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className={cn(
                    "w-full rounded-t-lg transition-all duration-500",
                    i === 0 ? "bg-primary h-2/3" : "bg-outline-variant h-4"
                  )}
                />
                <span className="text-[10px] font-bold text-on-surface-variant">{day}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-secondary-container p-6 rounded-3xl flex items-center gap-6">
        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
          <Bell className="w-8 h-8 text-on-secondary-container" />
        </div>
        <div className="flex-1">
          <h3 className="font-black text-on-secondary-container">Study Reminder</h3>
          <p className="text-sm text-on-secondary-container/80">
            {profile.notificationHour !== null 
              ? `Scheduled for ${profile.notificationHour}:00 daily.` 
              : 'Notifications are currently disabled.'}
          </p>
        </div>
        <button 
          onClick={() => setProfile({ ...profile, notificationHour: profile.notificationHour === null ? 20 : null })}
          className="px-4 py-2 bg-white text-secondary font-bold rounded-full text-xs"
        >
          {profile.notificationHour === null ? 'Enable' : 'Disable'}
        </button>
      </div>
    </div>
  );
};

// --- Screens ---

const HomeScreen = ({ setScreen, progress, setSelectedLetter, setSelectedLessonId }: { setScreen: (s: Screen) => void, progress: UserProgress, setSelectedLetter: (l: Letter) => void, setSelectedLessonId: (id: string) => void }) => {
  // Find the first unit that has incomplete lessons
  const activeUnitIndex = UNITS.findIndex(unit => 
    unit.lessons.some(lesson => !progress.completedLessons.includes(lesson.id))
  );
  
  // Default to the first unit if all are completed or none found
  const initialUnitIndex = activeUnitIndex === -1 ? 0 : activeUnitIndex;
  const [selectedUnitIndex, setSelectedUnitIndex] = useState(initialUnitIndex);
  
  const currentUnit = UNITS[selectedUnitIndex];
  
  // Calculate dynamic progress for the unit
  const unitLessonIds = currentUnit.lessons.map(l => l.id);
  const completedInUnit = progress.completedLessons.filter(id => unitLessonIds.includes(id)).length;
  const unitProgress = Math.round((completedInUnit / unitLessonIds.length) * 100);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Unit Selector */}
      <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto pb-2 no-scrollbar px-1">
        {UNITS.map((unit, idx) => {
          const isCompleted = unit.lessons.every(l => progress.completedLessons.includes(l.id));
          const isActive = idx === selectedUnitIndex;
          const isLocked = idx > activeUnitIndex && activeUnitIndex !== -1;

          return (
            <button
              key={unit.id}
              onClick={() => setSelectedUnitIndex(idx)}
              className={cn(
                "px-6 py-3 rounded-full font-bold text-sm whitespace-nowrap transition-all border-2 shrink-0 shadow-sm",
                isActive 
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105" 
                  : isCompleted 
                    ? "bg-primary-container text-on-primary-container border-primary/20 hover:border-primary"
                    : isLocked
                      ? "bg-surface-container-low text-on-surface-variant border-transparent opacity-60"
                      : "bg-surface-container-lowest text-on-surface border-outline-variant hover:border-primary hover:shadow-md"
              )}
            >
              Unit {unit.id}
              {isCompleted && <Check className="w-3.5 h-3.5 inline-block ml-1.5" />}
              {isLocked && <Lock className="w-3.5 h-3.5 inline-block ml-1.5" />}
            </button>
          );
        })}
      </div>

      {/* Unit Header */}
      <section className="mb-10 sm:mb-12 relative overflow-hidden bg-gradient-to-br from-primary to-primary-container rounded-[2rem] p-6 sm:p-8 text-on-primary shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="uppercase tracking-widest text-[10px] font-black opacity-80">Unit {currentUnit.id}</span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2 leading-tight">{currentUnit.title}</h1>
            <p className="text-on-primary/90 text-xs sm:text-sm max-w-sm">{currentUnit.description}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-3 sm:p-4 flex flex-col items-center min-w-[100px] sm:min-w-[120px]">
            <div className="text-xl sm:text-2xl font-black">{unitProgress}%</div>
            <div className="text-[9px] sm:text-[10px] uppercase font-bold opacity-80">Progress</div>
            <div className="w-full bg-white/30 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-white h-full transition-all duration-500" style={{ width: `${unitProgress}%` }}></div>
            </div>
          </div>
        </div>
        <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-4 -top-4 w-24 h-24 bg-primary-fixed-dim/20 rounded-full blur-xl"></div>
      </section>

      {/* Learning Path */}
      <div className="relative flex flex-col items-center py-8 space-y-16">
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-2 border-l-4 border-dotted border-outline-variant/30"></div>
        
        {currentUnit.lessons.map((lesson, idx) => {
          const isLeft = idx % 2 === 0;
          const isMastered = progress.completedLessons.includes(lesson.id);
          
          // Determine if this is the first uncompleted lesson in THIS unit
          const firstUncompletedInUnit = currentUnit.lessons.find(l => !progress.completedLessons.includes(l.id));
          const isCurrent = firstUncompletedInUnit?.id === lesson.id;
          
          // A lesson is locked if it's not mastered, not current, AND the unit itself is locked or previous lessons in unit are not done
          const isLocked = !isMastered && !isCurrent;

          return (
            <div 
              key={lesson.id} 
              className={cn(
                "relative z-10 flex flex-col items-center group",
                isLeft ? "-ml-16 md:-ml-32" : "ml-16 md:ml-32",
                idx === 2 && "ml-0 md:ml-0" // Center the current one if it's the 3rd
              )}
            >
              {isCurrent && (
                <div className="absolute -top-14 animate-bounce bg-secondary text-white text-[10px] font-bold py-1.5 px-4 rounded-full shadow-lg shadow-secondary/30 whitespace-nowrap z-20">
                  START HERE!
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-secondary rotate-45" />
                </div>
              )}
              
              <button
                disabled={isLocked}
                onClick={() => {
                  setSelectedLessonId(lesson.id);
                  if (lesson.type === 'quiz') setScreen('quiz');
                  else if (lesson.type === 'review') setScreen('review');
                  else {
                    const letter = ARABIC_LETTERS.find(l => l.id === lesson.letterId);
                    if (letter) setSelectedLetter(letter);
                    setScreen('lesson');
                  }
                }}
                className={cn(
                  "w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95",
                  isMastered && "bg-primary ring-8 ring-primary-container/30",
                  isCurrent && "w-24 h-24 bg-gradient-to-tr from-secondary to-secondary-container ring-8 ring-secondary-container/20",
                  isLocked && "bg-surface-container-high opacity-60 cursor-not-allowed"
                )}
              >
                {isMastered && <Check className="w-8 h-8 text-white stroke-[3px]" />}
                {isCurrent && <Play className="w-10 h-10 text-white fill-current" />}
                {isLocked && <Lock className="w-6 h-6 text-on-surface-variant fill-current" />}
                {lesson.type === 'treasure' && <Gift className="w-10 h-10 text-on-tertiary-container fill-current" />}
              </button>

              <div className={cn(
                "mt-4 shadow-sm rounded-lg px-4 py-2 text-center border-b-4",
                isMastered ? "bg-surface-container-lowest border-surface-container" : "bg-surface-container-low border-transparent",
                isCurrent && "bg-surface-container-lowest shadow-md px-6 py-3"
              )}>
                <p className={cn("text-xs font-bold", isLocked ? "text-on-surface-variant" : "text-on-surface")}>
                  {lesson.title}
                </p>
                {isMastered && <p className="text-[10px] text-primary font-bold">MASTERED</p>}
                {isCurrent && <p className="text-[11px] text-secondary font-bold">NEXT UP</p>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Next Unit Preview */}
      {selectedUnitIndex < UNITS.length - 1 && (
        <section className="mt-20 p-1 bg-surface-container-low rounded-lg">
          <button 
            onClick={() => setSelectedUnitIndex(selectedUnitIndex + 1)}
            className="w-full bg-surface-container-lowest rounded-lg p-6 flex items-center gap-6 hover:bg-surface-container-highest transition-colors text-left"
          >
            <div className="w-20 h-20 rounded-lg bg-surface-variant flex items-center justify-center shrink-0">
              <School className="w-10 h-10 text-outline" />
            </div>
            <div className="flex-1">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">Next Unit</span>
              <h3 className="text-lg font-bold text-on-surface mb-1">Unit {UNITS[selectedUnitIndex + 1].id}: {UNITS[selectedUnitIndex + 1].title}</h3>
              <p className="text-xs text-on-surface-variant">{UNITS[selectedUnitIndex + 1].description}</p>
            </div>
            <ChevronRight className="hidden sm:block text-outline-variant" />
          </button>
        </section>
      )}
    </div>
  );
};

const LessonScreen = ({ setScreen, letter, lessonId, onComplete }: { setScreen: (s: Screen) => void, letter: Letter, lessonId: string | null, onComplete: (id: string, letterId: string) => void }) => {
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const example = letter.examples[currentExampleIndex];

  return (
    <div className="max-w-4xl w-full mx-auto px-6 py-8 pt-[calc(var(--spacing-safe-top)+1rem)] pb-safe flex flex-col items-center">
      <div className="text-center mb-10">
        <span className="inline-block px-4 py-1 bg-tertiary-fixed text-on-tertiary-fixed rounded-full text-xs font-bold uppercase tracking-widest mb-4">New Discovery</span>
        <h1 className="text-4xl md:text-5xl font-black text-on-surface mb-2 font-headline">Meet the Letter '{letter.name}'</h1>
        <p className="text-on-surface-variant text-lg">The first step in your beautiful journey.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
        {/* Main Letter Spotlight */}
        <div className="md:col-span-7 bg-surface-container-lowest rounded-lg p-8 flex flex-col items-center justify-center relative overflow-hidden group shadow-sm transition-all hover:shadow-md">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary-container/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-secondary-container/20 rounded-full blur-3xl"></div>
          <div className="relative z-10 text-center">
            <span className="arabic-text text-9xl md:text-[12rem] font-bold text-primary leading-none" dir="rtl">{letter.char}</span>
            <div className="mt-8 flex flex-col items-center gap-4">
              <button 
                onClick={() => playArabic(letter.char)}
                className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform hover:bg-primary-container hover:text-on-primary-container"
              >
                <Volume2 className="w-8 h-8" />
              </button>
              <span className="font-bold text-xl text-on-surface-variant font-headline uppercase tracking-widest">Pronounced: "{letter.pronunciation}"</span>
            </div>
          </div>
        </div>

        {/* Forms Grid */}
        <div className="md:col-span-5 grid grid-cols-2 gap-4">
          {Object.entries(letter.forms).map(([key, value]) => (
            <div key={key} className="bg-surface-container-low p-6 rounded-lg flex flex-col items-center justify-between group transition-all hover:bg-surface-container-highest">
              <span className="text-xs font-bold text-outline uppercase">{key}</span>
              <span className="arabic-text text-5xl text-on-surface my-4">{value}</span>
              <span className="text-xs text-on-surface-variant text-center leading-tight">
                {key === 'isolated' && 'Standing alone'}
                {key === 'initial' && 'Starting a word'}
                {key === 'medial' && 'In the middle'}
                {key === 'final' && 'Ending a word'}
              </span>
            </div>
          ))}
        </div>

        {/* Interactive Context Card */}
        <div className="md:col-span-12 bg-secondary/5 rounded-lg p-6 flex flex-col md:flex-row items-center gap-8 border border-secondary/10">
          <div className="w-32 h-32 flex-shrink-0 bg-secondary-fixed rounded-2xl flex items-center justify-center overflow-hidden">
            <img 
              key={example.image}
              src={example.image} 
              alt={example.meaning} 
              className="w-24 h-24 object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-grow text-center md:text-left">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-2xl font-bold text-secondary font-headline">Example: {example.transliteration}</h3>
              <span className="text-[10px] font-black uppercase tracking-widest text-secondary/60">{example.position} position</span>
            </div>
            <p className="text-on-surface-variant mb-4">The word for "{example.meaning}" contains the letter <span className="font-bold text-primary">{letter.name}</span>.</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <div className="px-6 py-3 bg-white rounded-2xl text-secondary font-bold shadow-sm arabic-text text-3xl" dir="rtl">
                {example.word.split('').map((char, i) => (
                  <span 
                    key={i} 
                    className={i === example.highlightedIndex ? "text-primary font-black" : "opacity-80"}
                  >{char}</span>
                ))}
              </div>
              <button 
                onClick={() => playArabic(example.word)}
                className="w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center shadow-md active:scale-90 transition-transform"
              >
                <Volume2 className="w-6 h-6" />
              </button>
              <span className="px-4 py-2 bg-secondary-container text-on-secondary-container rounded-full font-medium self-center">{example.transliteration}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => setCurrentExampleIndex((currentExampleIndex + 1) % letter.examples.length)}
              className="flex items-center gap-2 bg-secondary text-white font-bold px-6 py-3 rounded-full hover:bg-secondary/80 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              Next Example
            </button>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-12 w-full flex items-center justify-between">
        <button 
          onClick={() => setScreen('home')}
          className="flex items-center gap-2 text-on-surface-variant font-bold px-6 py-3 rounded-full hover:bg-surface-container-highest transition-colors active:scale-95"
        >
          <X className="w-5 h-5" />
          Skip
        </button>
        <button 
          onClick={() => onComplete(lessonId || ('lesson-' + letter.id), letter.id)}
          className="bg-gradient-to-r from-primary to-primary-container text-white px-12 py-4 rounded-full font-black text-lg shadow-xl shadow-primary/30 active:scale-95 transition-all hover:brightness-110"
        >
          Mastered!
        </button>
      </div>
    </div>
  );
};

const ReviewScreen = ({ setScreen, lessonId, progress, onComplete }: { setScreen: (s: Screen) => void, lessonId: string | null, progress: UserProgress, onComplete: (id: string) => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  
  // Get some words from mastered letters for review
  const reviewWords = ARABIC_LETTERS
    .filter(l => progress.masteredLetters.includes(l.id))
    .flatMap(l => l.examples)
    .slice(0, 5);

  // Fallback if no letters mastered yet
  const displayWords = reviewWords.length > 0 ? reviewWords : ARABIC_LETTERS[0].examples;
  const currentWord = displayWords[currentStep % displayWords.length];

  const handleContinue = () => {
    if (currentStep < displayWords.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelected(null);
    } else {
      onComplete(lessonId || 'review-1');
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto px-6 py-8 pt-[calc(var(--spacing-safe-top)+1rem)] pb-safe flex flex-col items-center">
      <div className="w-full flex items-center justify-between mb-12">
        <button onClick={() => setScreen('home')} className="p-2 rounded-full hover:bg-surface-container-highest">
          <X className="w-6 h-6" />
        </button>
        <div className="flex-grow mx-8 h-3 bg-surface-container rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500" 
            style={{ width: `${((currentStep + 1) / displayWords.length) * 100}%` }}
          ></div>
        </div>
        <span className="font-black text-primary">{currentStep + 1}/{displayWords.length}</span>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-3xl font-black mb-4">Memory Review</h1>
        <p className="text-on-surface-variant">Do you remember this word?</p>
      </div>

      <motion.div 
        key={currentStep}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-surface-container-lowest p-12 rounded-3xl shadow-xl border border-outline-variant flex flex-col items-center w-full max-w-md"
      >
        <div className="w-48 h-48 bg-secondary-container rounded-3xl flex items-center justify-center mb-8 overflow-hidden">
          <img 
            key={currentWord.image}
            src={currentWord.image} 
            alt={currentWord.meaning} 
            className="w-32 h-32 object-contain" 
            referrerPolicy="no-referrer" 
          />
        </div>
        <div className="arabic-text text-7xl mb-4 text-primary flex items-center" dir="rtl">
          {currentWord.word.split('').map((char, i) => (
            <span 
              key={i} 
              className={i === currentWord.highlightedIndex ? "font-black underline decoration-4 underline-offset-8" : "opacity-80"}
            >{char}</span>
          ))}
          <button 
            onClick={() => playArabic(currentWord.word)}
            className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all mr-4"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>
        <h2 className="text-2xl font-black text-on-surface mb-2">{currentWord.transliteration}</h2>
        <p className="text-xl text-on-surface-variant font-medium">"{currentWord.meaning}"</p>
      </motion.div>

      <div className="mt-12 w-full max-w-md">
        <button 
          onClick={handleContinue}
          className="w-full py-5 bg-primary text-white rounded-full font-black text-xl shadow-xl shadow-primary/20 active:scale-95 transition-transform"
        >
          I REMEMBER!
        </button>
        <button 
          onClick={() => setScreen('lesson')}
          className="w-full py-4 mt-4 text-on-surface-variant font-bold hover:underline"
        >
          Need a hint?
        </button>
      </div>
    </div>
  );
};

const QuizScreen = ({ setScreen, lessonId, onComplete, progress }: { setScreen: (s: Screen) => void, lessonId: string | null, onComplete: (id: string) => void, progress: UserProgress }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Generate a simple quiz based on mastered or current letters
  const quizQuestions = [
    {
      question: "Which letter makes the 'Ah' sound?",
      options: [
        { char: 'ب', name: 'Ba', id: 'ba' },
        { char: 'أ', name: 'Alif', id: 'alif', correct: true },
        { char: 'ت', name: 'Ta', id: 'ta' },
        { char: 'ج', name: 'Jim', id: 'jim' },
      ]
    },
    {
      question: "Which word means 'House'?",
      options: [
        { char: 'أرنب', name: 'Arnab', id: 'arnab' },
        { char: 'بيت', name: 'Bayt', id: 'bayt', correct: true },
        { char: 'تفاحة', name: 'Tuffaha', id: 'tuffaha' },
        { char: 'جبل', name: 'Jabal', id: 'jabal' },
      ]
    }
  ];

  const currentQuestion = quizQuestions[currentStep % quizQuestions.length];

  const handleSelect = (option: any) => {
    setSelected(option.id);
    setIsCorrect(option.correct || false);
  };

  const handleContinue = () => {
    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelected(null);
      setIsCorrect(null);
    } else {
      onComplete(lessonId || 'quiz-unit-1');
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto px-6 py-8 pt-[calc(var(--spacing-safe-top)+1rem)] pb-safe">
      <div className="flex flex-col gap-6 mb-12">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setScreen('home')}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-low hover:bg-surface-container-highest transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex-grow h-3 bg-secondary-container/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-secondary transition-all duration-500" 
              style={{ width: `${((currentStep + 1) / quizQuestions.length) * 100}%` }}
            ></div>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="w-5 h-5 text-error fill-current" />
            <span className="font-headline font-bold text-on-surface">5</span>
          </div>
        </div>
        <div className="max-w-2xl">
          <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight mb-2">
            {currentQuestion.question}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {currentQuestion.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option)}
            disabled={selected !== null}
            className={cn(
              "group relative flex flex-col items-center justify-center p-12 bg-surface-container-lowest hover:bg-surface-bright rounded-3xl border-2 transition-all duration-200",
              selected === option.id 
                ? (option.correct ? "border-primary bg-primary/5 ring-4 ring-primary/10" : "border-error bg-error/5 ring-4 ring-error/10")
                : "border-outline-variant hover:border-primary"
            )}
          >
            <button 
              onClick={(e) => {
                e.stopPropagation();
                playArabic(option.char);
              }}
              className="absolute top-4 right-4 w-10 h-10 bg-surface-container-high text-on-surface-variant rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all z-10"
            >
              <Volume2 className="w-5 h-5" />
            </button>
            <span className={cn(
              "arabic-text text-8xl md:text-9xl mb-4 transition-transform duration-300 group-hover:scale-110",
              selected === option.id && option.correct ? "text-primary" : "text-on-surface"
            )} dir="rtl">
              {option.char.split('').map((c, i) => (
                <span key={i}>{c}</span>
              ))}
            </span>
            <span className={cn(
              "font-headline font-bold transition-opacity",
              selected === option.id ? "opacity-100" : "opacity-0 group-hover:opacity-100",
              selected === option.id && option.correct ? "text-primary" : "text-on-surface-variant"
            )}>
              {option.name}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={cn(
              "fixed bottom-0 left-0 right-0 md:relative mt-12 w-full flex flex-col md:flex-row items-center justify-between gap-6 p-8 md:rounded-3xl z-50",
              isCorrect ? "bg-primary-container text-on-primary-container" : "bg-error-container text-on-error-container"
            )}
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center",
                isCorrect ? "bg-primary/20" : "bg-error/20"
              )}>
                {isCorrect ? (
                  <Check className="w-8 h-8 text-primary stroke-[3px]" />
                ) : (
                  <X className="w-8 h-8 text-error stroke-[3px]" />
                )}
              </div>
              <div>
                <h3 className="font-headline font-extrabold text-xl">
                  {isCorrect ? "Excellent Work!" : "Not quite right"}
                </h3>
                <p className="opacity-80">
                  {isCorrect 
                    ? "You're mastering the Arabic alphabet!"
                    : "Keep practicing, you'll get it next time."}
                </p>
              </div>
            </div>
            <button 
              onClick={handleContinue}
              className="w-full md:w-auto px-12 py-4 bg-primary text-white font-black rounded-full text-lg shadow-lg active:scale-95 transition-transform"
            >
              CONTINUE
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProfileScreen = ({ profile, progress, onReset, onLogout }: { profile: UserProfile, progress: UserProgress, onReset: () => void, onLogout: () => void }) => {
  const badges = [
    { id: 1, title: 'Alif Master', desc: 'Completed all Alif script basics with 100% accuracy.', icon: School, color: 'primary' },
    { id: 2, title: '7-Day Streak', desc: 'Learning every day for a full week. Consistency is key!', icon: Flame, color: 'secondary' },
    { id: 3, title: 'Social Bee', desc: 'Followed 10 other learners and shared your progress.', icon: Users, color: 'tertiary' },
    { id: 4, title: 'Certified', desc: 'Passed the Level 10 proficiency examination.', icon: Verified, color: 'error' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-12 py-8">
      {/* Hero Profile Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Profile Identity Card */}
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-3xl p-8 flex flex-col items-center text-center relative overflow-hidden shadow-sm border border-outline-variant">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/20 rounded-bl-[100%] -mr-8 -mt-8"></div>
          <div className="relative group">
            <img 
              src={profile.avatar} 
              alt={profile.name} 
              className="w-32 h-32 rounded-full object-cover ring-4 ring-primary-container mb-6 group-hover:scale-105 transition-transform"
            />
            <div className="absolute -bottom-2 right-2 bg-secondary text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg border-4 border-surface-container-lowest">
              {Math.floor(progress.xp / 100) + 1}
            </div>
          </div>
          <h1 className="text-3xl font-black text-on-surface mb-2 tracking-tight">{profile.name}</h1>
          <p className="text-on-surface-variant mb-6 font-medium">Linguistic Explorer since March 2026</p>
          
          <button 
            onClick={onReset}
            className="flex items-center gap-2 text-error font-bold text-sm px-4 py-2 rounded-full hover:bg-error/10 transition-colors mb-2"
          >
            <RefreshCw className="w-4 h-4" />
            Reset Progress
          </button>
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 text-on-surface-variant font-bold text-sm px-4 py-2 rounded-full hover:bg-surface-container-highest transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        {/* Stats Bento Grid */}
        <div className="lg:col-span-7 grid grid-cols-2 gap-4">
          <div className="bg-surface-container-low rounded-3xl p-6 flex flex-col justify-between group hover:bg-surface-container-high transition-colors">
            <Zap className="w-10 h-10 text-primary fill-current mb-4" />
            <div>
              <p className="text-4xl font-black text-on-surface leading-none">{progress.xp}</p>
              <p className="text-on-surface-variant font-semibold text-sm mt-1 uppercase tracking-wider">Total XP Earned</p>
            </div>
          </div>
          <div className="bg-surface-container-low rounded-3xl p-6 flex flex-col justify-between group hover:bg-surface-container-high transition-colors">
            <Flame className="w-10 h-10 text-secondary fill-current mb-4" />
            <div>
              <p className="text-4xl font-black text-on-surface leading-none">{progress.streak}</p>
              <p className="text-on-surface-variant font-semibold text-sm mt-1 uppercase tracking-wider">Day Streak</p>
            </div>
          </div>
          <div className="col-span-2 bg-gradient-to-br from-primary/10 to-surface-container-low rounded-3xl p-6 flex items-center justify-between overflow-hidden relative border border-outline-variant">
            <div className="relative z-10">
              <p className="text-primary font-black text-4xl leading-none">#{Math.floor(Math.random() * 100) + 1}</p>
              <p className="text-on-surface-variant font-semibold text-sm mt-1 uppercase tracking-wider">Global Ranking</p>
            </div>
            <Globe className="w-32 h-32 text-primary/10 absolute -right-4 -bottom-4 rotate-12" />
            <div className="flex -space-x-3">
              {[1, 2, 3].map(i => (
                <img 
                  key={i}
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`} 
                  alt="User" 
                  className="w-10 h-10 rounded-full border-2 border-surface-container-lowest"
                />
              ))}
              <div className="w-10 h-10 rounded-full bg-surface-container-highest border-2 border-surface-container-lowest flex items-center justify-center text-xs font-bold">+4k</div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <section>
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-on-surface tracking-tight">Unlocked Badges</h2>
            <p className="text-on-surface-variant font-medium">You've mastered {progress.masteredLetters.length} letters so far!</p>
          </div>
          <button className="text-primary font-bold hover:underline flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {badges.map((badge) => (
            <div key={badge.id} className="bg-surface-container-lowest rounded-3xl p-6 flex flex-col items-center text-center group hover:scale-[1.02] transition-transform shadow-sm border border-outline-variant">
              <div className={cn(
                "w-20 h-20 rounded-full flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform",
                badge.color === 'primary' && "bg-primary-container/20 text-primary",
                badge.color === 'secondary' && "bg-secondary-container/20 text-secondary",
                badge.color === 'tertiary' && "bg-tertiary-container/20 text-tertiary",
                badge.color === 'error' && "bg-error-container/20 text-error"
              )}>
                <badge.icon className="w-10 h-10 fill-current" />
              </div>
              <h3 className="font-headline font-bold text-on-surface mb-1">{badge.title}</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">{badge.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const PracticeScreen = ({ progress, setScreen }: { progress: UserProgress, setScreen: (s: Screen) => void }) => {
  const [mode, setMode] = useState<'menu' | 'flashcards' | 'audio-quiz'>('menu');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Get all words from mastered letters
  const masteredWords = ARABIC_LETTERS
    .filter(l => progress.masteredLetters.includes(l.id))
    .flatMap(l => l.examples);

  // Fallback if no letters mastered
  const wordsToPractice = masteredWords.length > 0 ? masteredWords : ARABIC_LETTERS[0].examples;

  const handleNext = () => {
    if (currentIdx < wordsToPractice.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setIsFlipped(false);
    } else {
      setShowResult(true);
    }
  };

  const handleAudioQuiz = (selectedMeaning: string) => {
    if (selectedMeaning === wordsToPractice[currentIdx].meaning) {
      setScore(score + 1);
    }
    handleNext();
  };

  if (mode === 'menu') {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 pt-[calc(var(--spacing-safe-top)+2rem)]">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-on-surface mb-4 font-headline">Practice Zone</h1>
          <p className="text-on-surface-variant text-lg">Strengthen your memory with interactive exercises.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button 
            onClick={() => setMode('flashcards')}
            className="p-8 bg-primary-container/20 border-2 border-primary/20 rounded-3xl flex flex-col items-center gap-6 hover:border-primary transition-all group active:scale-95"
          >
            <div className="w-20 h-20 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
              <BookOpen className="w-10 h-10" />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-black text-on-primary-container mb-2">Flashcards</h3>
              <p className="text-on-primary-container/70 text-sm">Flip cards to test your word recognition.</p>
            </div>
          </button>

          <button 
            onClick={() => setMode('audio-quiz')}
            className="p-8 bg-secondary-container/20 border-2 border-secondary/20 rounded-3xl flex flex-col items-center gap-6 hover:border-secondary transition-all group active:scale-95"
          >
            <div className="w-20 h-20 bg-secondary text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:-rotate-6 transition-transform">
              <Volume2 className="w-10 h-10" />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-black text-on-secondary-container mb-2">Audio Quiz</h3>
              <p className="text-on-secondary-container/70 text-sm">Listen to the word and pick the meaning.</p>
            </div>
          </button>
        </div>

        <div className="mt-12 p-8 bg-surface-container-low rounded-3xl border border-outline-variant">
          <h3 className="text-xl font-black mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-tertiary" />
            Your Word Bank
          </h3>
          <p className="text-on-surface-variant mb-6">You've unlocked {masteredWords.length} words so far.</p>
          <div className="flex flex-wrap gap-2">
            {masteredWords.slice(0, 10).map((w, i) => (
              <div className="px-3 py-1 bg-white border border-outline-variant rounded-full text-sm font-bold arabic-text" dir="rtl">
                {w.word.split('').map((c, i) => (
                  <span key={i}>{c}</span>
                ))}
              </div>
            ))}
            {masteredWords.length > 10 && <span className="text-xs text-on-surface-variant self-center font-bold">+{masteredWords.length - 10} more</span>}
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="max-w-md mx-auto px-6 py-20 text-center">
        <div className="w-24 h-24 bg-tertiary-container text-tertiary rounded-full flex items-center justify-center mx-auto mb-8">
          <Award className="w-12 h-12" />
        </div>
        <h2 className="text-4xl font-black text-on-surface mb-2">Practice Complete!</h2>
        <p className="text-on-surface-variant mb-8 text-lg">Great job reinforcing your knowledge.</p>
        {mode === 'audio-quiz' && (
          <div className="bg-surface-container p-6 rounded-3xl mb-8">
            <p className="text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-1">Score</p>
            <p className="text-5xl font-black text-primary">{score} / {wordsToPractice.length}</p>
          </div>
        )}
        <button 
          onClick={() => {
            setMode('menu');
            setShowResult(false);
            setCurrentIdx(0);
            setScore(0);
          }}
          className="w-full py-4 bg-primary text-white rounded-full font-black text-lg shadow-lg shadow-primary/20 active:scale-95 transition-transform"
        >
          Back to Practice
        </button>
      </div>
    );
  }

  const currentWord = wordsToPractice[currentIdx];

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 pt-[calc(var(--spacing-safe-top)+2rem)]">
      <div className="flex items-center justify-between mb-12">
        <button onClick={() => setMode('menu')} className="p-2 rounded-full hover:bg-surface-container-highest">
          <X className="w-6 h-6" />
        </button>
        <div className="flex-grow mx-8 h-2 bg-surface-container rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500" 
            style={{ width: `${((currentIdx + 1) / wordsToPractice.length) * 100}%` }}
          />
        </div>
        <span className="font-bold text-sm text-on-surface-variant">{currentIdx + 1} / {wordsToPractice.length}</span>
      </div>

      {mode === 'flashcards' && (
        <div className="flex flex-col items-center gap-12">
          <motion.div 
            className="w-full aspect-[4/5] relative preserve-3d cursor-pointer"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {/* Front */}
            <div className="absolute inset-0 backface-hidden bg-surface-container-lowest border-4 border-primary/20 rounded-[3rem] flex flex-col items-center justify-center p-12 shadow-xl">
              <span className="arabic-text text-8xl md:text-9xl text-primary font-bold mb-8" dir="rtl">
                {currentWord.word.split('').map((c, i) => (
                  <span key={i}>{c}</span>
                ))}
              </span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  playArabic(currentWord.word);
                }}
                className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all"
              >
                <Volume2 className="w-8 h-8" />
              </button>
              <p className="mt-12 text-on-surface-variant font-bold uppercase tracking-widest text-sm">Tap to flip</p>
            </div>
            {/* Back */}
            <div className="absolute inset-0 backface-hidden bg-primary text-white rounded-[3rem] flex flex-col items-center justify-center p-12 shadow-xl rotate-y-180">
              <div className="w-32 h-32 bg-white/20 rounded-3xl flex items-center justify-center mb-8 overflow-hidden">
                <img src={currentWord.image} alt={currentWord.meaning} className="w-24 h-24 object-contain" referrerPolicy="no-referrer" />
              </div>
              <h2 className="text-5xl font-black mb-2">{currentWord.meaning}</h2>
              <p className="text-xl opacity-80 font-bold">{currentWord.transliteration}</p>
              <p className="mt-12 text-white/60 font-bold uppercase tracking-widest text-sm">Tap to flip back</p>
            </div>
          </motion.div>

          <button 
            onClick={handleNext}
            className="w-full py-5 bg-primary text-white rounded-full font-black text-xl shadow-xl shadow-primary/20 active:scale-95 transition-transform"
          >
            {currentIdx === wordsToPractice.length - 1 ? 'Finish' : 'Next Card'}
          </button>
        </div>
      )}

      {mode === 'audio-quiz' && (
        <div className="flex flex-col items-center gap-12">
          <div className="w-full bg-surface-container-low rounded-[3rem] p-12 flex flex-col items-center gap-8 border-2 border-outline-variant">
            <div className="w-32 h-32 bg-secondary text-white rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <Volume2 className="w-16 h-16" />
            </div>
            <button 
              onClick={() => playArabic(currentWord.word)}
              className="px-8 py-4 bg-secondary text-white rounded-full font-black text-lg shadow-lg active:scale-95 transition-transform"
            >
              Play Audio
            </button>
            <p className="text-on-surface-variant font-bold">Listen carefully and pick the correct meaning</p>
          </div>

          <div className="grid grid-cols-1 gap-4 w-full">
            {/* Generate options: correct one + 3 random ones */}
            {[
              currentWord.meaning,
              ...ARABIC_LETTERS
                .flatMap(l => l.examples)
                .filter(e => e.meaning !== currentWord.meaning)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3)
                .map(e => e.meaning)
            ].sort(() => Math.random() - 0.5).map((option, i) => (
              <button 
                key={i}
                onClick={() => handleAudioQuiz(option)}
                className="w-full p-6 bg-surface-container-lowest border-2 border-outline-variant rounded-2xl text-xl font-black text-on-surface hover:border-secondary hover:bg-secondary/5 transition-all text-center active:scale-[0.98]"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [user, loading, error] = useAuthState(auth);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [screen, setScreen] = useState<Screen>('login');
  const [progress, setProgress] = useState<UserProgress>(INITIAL_PROGRESS);
  const [selectedLetter, setSelectedLetter] = useState<Letter>(ARABIC_LETTERS[0]);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [showResetModal, setShowResetModal] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);

  // Handle Auth State Changes
  React.useEffect(() => {
    if (!loading) {
      setIsAuthReady(true);
      if (user) {
        // Fetch profile and progress
        const profileRef = doc(db, 'users', user.uid);
        const progressRef = doc(db, 'users', user.uid, 'progress', 'current');

        const unsubProfile = onSnapshot(profileRef, (docSnap) => {
          if (docSnap.exists()) {
            setProfile(docSnap.data() as UserProfile);
            setScreen(prev => prev === 'login' ? 'home' : prev);
          } else {
            setScreen('onboarding');
          }
        }, (err) => handleFirestoreError(err, OperationType.GET, `users/${user.uid}`));

        const unsubProgress = onSnapshot(progressRef, (docSnap) => {
          if (docSnap.exists()) {
            setProgress(docSnap.data() as UserProgress);
          }
        }, (err) => handleFirestoreError(err, OperationType.GET, `users/${user.uid}/progress/current`));

        return () => {
          unsubProfile();
          unsubProgress();
        };
      } else {
        setProfile(null);
        setProgress(INITIAL_PROGRESS);
        setScreen('login');
      }
    }
  }, [user, loading]);

  const handleOnboardingComplete = async (newProfile: UserProfile) => {
    if (!user) return;
    try {
      const profileRef = doc(db, 'users', user.uid);
      const progressRef = doc(db, 'users', user.uid, 'progress', 'current');
      
      await setDoc(profileRef, { ...newProfile, uid: user.uid });
      await setDoc(progressRef, INITIAL_PROGRESS);
      
      setProfile(newProfile);
      setScreen('home');
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}`);
    }
  };

  const handleReset = async () => {
    if (!user) return;
    try {
      const progressRef = doc(db, 'users', user.uid, 'progress', 'current');
      await setDoc(progressRef, INITIAL_PROGRESS);
      setProgress(INITIAL_PROGRESS);
      setShowResetModal(false);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}/progress/current`);
    }
  };

  const handleCompleteLesson = async (lessonId: string, letterId?: string) => {
    if (!user) return;
    
    const newProgress = { ...progress };
    const isNewLesson = !newProgress.completedLessons.includes(lessonId);
    const newCompleted = isNewLesson ? [...newProgress.completedLessons, lessonId] : newProgress.completedLessons;
    const newMasteredLetters = (letterId && !newProgress.masteredLetters.includes(letterId)) 
      ? [...newProgress.masteredLetters, letterId] 
      : newProgress.masteredLetters;
    
    const updatedProgress = {
      ...newProgress,
      xp: newProgress.xp + (isNewLesson ? 20 : 5),
      completedLessons: newCompleted,
      masteredLetters: newMasteredLetters,
      lastActiveDate: new Date().toISOString().split('T')[0]
    };

    try {
      const progressRef = doc(db, 'users', user.uid, 'progress', 'current');
      await setDoc(progressRef, updatedProgress);
      setProgress(updatedProgress);
      setScreen('home');
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}/progress/current`);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  if (loading || !isAuthReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (!profile || screen === 'onboarding') {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/20 pt-safe pb-safe">
      <TopBar 
        profile={profile} 
        progress={progress} 
        onOpenDashboard={() => setScreen('dashboard')} 
      />
      <Sidebar currentScreen={screen} setScreen={setScreen} profile={profile} progress={progress} />
      
      <main className={cn(
        "min-h-screen transition-all duration-300",
        !['quiz', 'lesson'].includes(screen) && "md:pl-64 pt-[calc(3.5rem+var(--spacing-safe-top))] pb-[calc(4rem+var(--spacing-safe-bottom))] md:pb-8"
      )}>
            <AnimatePresence mode="wait">
              <motion.div
                key={screen}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full h-full"
              >
                {screen === 'login' && <LoginScreen onLogin={handleLogin} />}
                {screen === 'home' && <HomeScreen setScreen={setScreen} progress={progress} setSelectedLetter={setSelectedLetter} setSelectedLessonId={setSelectedLessonId} />}
            {screen === 'dashboard' && <DashboardScreen profile={profile} progress={progress} setProfile={setProfile} />}
            {screen === 'practice' && <PracticeScreen progress={progress} setScreen={setScreen} />}
            {screen === 'lesson' && <LessonScreen setScreen={setScreen} letter={selectedLetter} lessonId={selectedLessonId} onComplete={handleCompleteLesson} />}
            {screen === 'quiz' && <QuizScreen setScreen={setScreen} lessonId={selectedLessonId} onComplete={handleCompleteLesson} progress={progress} />}
            {screen === 'review' && <ReviewScreen setScreen={setScreen} lessonId={selectedLessonId} progress={progress} onComplete={handleCompleteLesson} />}
            {screen === 'profile' && <ProfileScreen profile={profile} progress={progress} onReset={() => setShowResetModal(true)} onLogout={handleLogout} />}
            {screen === 'letters' && (
              <div className="max-w-4xl mx-auto px-6 py-8">
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <h1 className="text-3xl font-black font-headline">Arabic Alphabet</h1>
                    <p className="text-on-surface-variant text-sm">Master all 28 letters of the Arabic language.</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-primary">{progress.masteredLetters.length}</span>
                    <span className="text-on-surface-variant text-xs font-bold uppercase ml-1">/ 28 Mastered</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {ARABIC_LETTERS.map(l => {
                    const isMastered = progress.masteredLetters.includes(l.id);
                    return (
                      <button 
                        key={l.id}
                        onClick={() => {
                          setSelectedLetter(l);
                          setScreen('lesson');
                        }}
                        className={cn(
                          "relative p-6 rounded-3xl border transition-all flex flex-col items-center gap-2 group active:scale-95",
                          isMastered 
                            ? "bg-primary-container/20 border-primary/30 hover:border-primary" 
                            : "bg-surface-container-lowest border-outline-variant hover:border-primary"
                        )}
                      >
                        {isMastered && (
                          <div className="absolute top-2 right-2 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center shadow-sm">
                            <Check className="w-3.5 h-3.5 stroke-[3px]" />
                          </div>
                        )}
                        <span className={cn(
                          "arabic-text text-5xl transition-transform group-hover:scale-110",
                          isMastered ? "text-primary" : "text-on-surface"
                        )} dir="rtl">{l.char}</span>
                        <span className="font-bold text-sm text-on-surface-variant font-headline">{l.name}</span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            playArabic(l.char);
                          }}
                          className="mt-2 w-8 h-8 bg-surface-container-high text-on-surface-variant rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomNav currentScreen={screen} setScreen={setScreen} />

      {/* Reset Modal */}
      <AnimatePresence>
        {showResetModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-on-surface/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-surface rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-error-container text-error rounded-full flex items-center justify-center mx-auto mb-6">
                <RefreshCw className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black text-on-surface mb-2">Reset Progress?</h2>
              <p className="text-on-surface-variant mb-8">This will delete all your progress and settings. You'll start from zero.</p>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleReset}
                  className="w-full py-4 bg-error text-white rounded-full font-black shadow-lg shadow-error/20 active:scale-95 transition-transform"
                >
                  YES, RESET EVERYTHING
                </button>
                <button 
                  onClick={() => setShowResetModal(false)}
                  className="w-full py-4 bg-surface-container-highest text-on-surface font-black rounded-full active:scale-95 transition-transform"
                >
                  CANCEL
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
