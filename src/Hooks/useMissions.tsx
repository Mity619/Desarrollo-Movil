import { useState, useEffect, useCallback } from "react";
import {
  doc, onSnapshot, setDoc, serverTimestamp,
  collection, query, orderBy, limit, getDocs,
} from "firebase/firestore";
import { db } from "../Config/config";
import { useAuth } from "../Context/AuthContext";

export type MissionId = 1 | 2 | 3;

export interface Mission {
  id: MissionId;
  title: string;
  description: string;
  points: number;
}

export const MISSIONS: Mission[] = [
  { id: 1, title: "Evidencia fotográfica", description: "Toma una foto con la cámara", points: 25 },
  { id: 2, title: "Movimiento real", description: "Muévete al menos 30m de tu posición inicial", points: 35 },
  { id: 3, title: "Permanencia activa", description: "Quédate quieto 10 segundos", points: 40 },
];

export interface UserProgress {
  points: number;
  missions: { [key: string]: boolean };
}

const STORAGE_KEY = "missions-progress";

export function useMissions() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress>({ points: 0, missions: {} });
  const [ranking, setRanking] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Carga inicial + suscripción
  useEffect(() => {
    if (!user) { setLoading(false); return; }

    // localStorage primero para UI instantánea
    const local = localStorage.getItem(`${STORAGE_KEY}-${user.uid}`);
    if (local) { try { setProgress(JSON.parse(local)); } catch {} }

    const ref = doc(db, "users", user.uid);
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        const p: UserProgress = {
          points: data.points ?? 0,
          missions: data.missions ?? {},
        };
        setProgress(p);
        localStorage.setItem(`${STORAGE_KEY}-${user.uid}`, JSON.stringify(p));
      }
      setLoading(false);
    });
    return () => unsub();
  }, [user]);

  // Ranking (top 5)
  useEffect(() => {
    if (!user) return;
    const loadRanking = async () => {
      const q = query(collection(db, "users"), orderBy("points", "desc"), limit(5));
      const snap = await getDocs(q);
      setRanking(snap.docs.map((d) => ({ uid: d.id, ...d.data() })));
    };
    loadRanking();
  }, [user, progress.points]);

  const completeMission = useCallback(async (id: MissionId) => {
    if (!user) return;
    const mission = MISSIONS.find((m) => m.id === id);
    if (!mission || progress.missions[String(id)]) return;

    const newMissions = { ...progress.missions, [String(id)]: true };
    const newPoints = progress.points + mission.points;

    await setDoc(doc(db, "users", user.uid), {
      points: newPoints,
      missions: newMissions,
      updatedAt: serverTimestamp(),
    }, { merge: true });

    localStorage.setItem(`${STORAGE_KEY}-${user.uid}`,
      JSON.stringify({ points: newPoints, missions: newMissions }));
  }, [user, progress]);

  const isCompleted = (id: MissionId) => !!progress.missions[String(id)];
  const isUnlocked = (id: MissionId) => {
    if (id === 1) return true;
    if (id === 2) return isCompleted(1);
    if (id === 3) return isCompleted(2);
    return false;
  };

  const completedCount = MISSIONS.filter((m) => isCompleted(m.id)).length;
  const totalMissions = MISSIONS.length;
  const progressPercent = (completedCount / totalMissions) * 100;

  return {
    progress, ranking, loading, missions: MISSIONS,
    completeMission, isCompleted, isUnlocked,
    completedCount, totalMissions, progressPercent,
  };
}