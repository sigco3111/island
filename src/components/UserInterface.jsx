import { Brush, CircleDotDashed, CircleFadingPlus, Download, Eraser, Hand, HelpCircle, Redo, RefreshCw, Undo } from "lucide-react";
import { useEffect, useState } from "react";

import { useKeyboardManager } from "../hooks/useKeyboardManager";
import { useResetIsland } from "../hooks/useResetIsland.js";
import { useIslandStore } from "../stores/useIslandStore.js";
import { createSnapshot, loadSnapshotFromPath } from "../utils/islandSnapshot.js";

import { Toolbar } from "./ui";
import CreditsButton from "./ui/CreditsButton.jsx";
import CreditsModal from "./ui/CreditsModal.jsx";
import DefaultIslandButton from "./ui/DefaultIslandButton.jsx";
import DeleteButton from "./ui/DeleteButton.jsx";
import HelpModal from "./ui/HelpModal.jsx";
import IntroNotification from "./ui/IntroNotification.jsx";
import MegaPlaceDecorButton from "./ui/MegaPlaceDecorButton.jsx";

// Tool options for the toolbar
const TOOL_OPTIONS = [
  { id: "move", icon: Hand, label: "이동", shortcut: ["v"], type: "toggle" },
  { id: "sculpt+", icon: Brush, label: "지형 높이기", shortcut: ["a"], type: "toggle" },
  { id: "sculpt-", icon: Eraser, label: "지형 낮추기", shortcut: ["s"], type: "toggle" },
  { id: "size", icon: CircleDotDashed, label: "브러시 크기", shortcut: ["[", "]"], type: "slider" },
  { id: "strength", icon: CircleFadingPlus, label: "브러시 강도", shortcut: ["-", "+"], type: "slider" },
  // { id: "decor-select", icon: WandSparkles, label: "장식 배치", shortcut: ["p"], type: "decor-select" },
  { id: "undo", icon: Undo, label: "실행 취소", shortcut: ["u"], type: "action" },
  { id: "redo", icon: Redo, label: "다시 실행", shortcut: ["y"], type: "action" },
  { id: "download", icon: Download, label: "JSON 내려받기", type: "action" },
  { id: "reset", icon: RefreshCw, label: "초기화", shortcut: ["Shift", "r"], type: "action" },
  { id: "help", icon: HelpCircle, label: "도움말", shortcut: ["h"], type: "action" },
];

// All UI components have been moved to their own files in the ui directory

export default function UserInterface() {
  // Set up the keyboard manager for shortcuts
  useKeyboardManager();

  // State from stores
  const editMode = useIslandStore(state => state.editMode);
  const setEditMode = useIslandStore(state => state.actions.setEditMode);
  const sculpt = useIslandStore(state => state.sculpt);
  const setPlaceProp = useIslandStore(state => state.actions.setPlaceProp);
  const setSculptProp = useIslandStore(state => state.actions.setSculptProp);
  const activeTool = useIslandStore(state => state.activeTool);
  const setActiveTool = useIslandStore(state => state.actions.setActiveTool);
  const hasDismissedIntro = useIslandStore(state => state.persisted.hasDismissedIntro);
  const setHasDismissedIntro = useIslandStore(state => state.actions.setHasDismissedIntro);

  // Local state
  const resetIsland = useResetIsland();
  const [openSlider, setOpenSlider] = useState(null);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showCreditsModal, setShowCreditsModal] = useState(false);
  const [showIntroNotification, setShowIntroNotification] = useState(false);

  // Toggle edit mode
  const toggleEditMode = () => setEditMode(!editMode);

  // Show intro notification
  useEffect(() => {
    if (!hasDismissedIntro) {
      const timer = setTimeout(() => setShowIntroNotification(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [hasDismissedIntro]);

  // Handle dismissing the intro
  const handleDismissIntro = () => {
    setShowIntroNotification(false);
    setHasDismissedIntro(true);
  };

  // Handle creating a new island
  const handleCreateNewIsland = () => {
    setEditMode(true);
    setShowIntroNotification(false);
    setHasDismissedIntro(true);
    resetIsland();
  };

  // Manage mutually exclusive state for sculpt and place tools
  useEffect(() => {
    const tool = activeTool;
    setActiveTool(null);
    setActiveTool(tool);

    if (tool === "sculpt+" || tool === "sculpt-") {
      setSculptProp("active", true);
      setPlaceProp("decorSelect", false);
      setPlaceProp("active", false);
    }
    if (tool === "move") {
      setPlaceProp("active", false);
      setPlaceProp("item", null);
      setPlaceProp("decorSelect", false);
      setSculptProp("active", false);
    }
    if (tool === "decor-select") {
      setSculptProp("active", false);
    }
  }, [activeTool, setActiveTool, setPlaceProp, setSculptProp]);

  // Create snapshot
  const handleCreateSnapshot = () => {
    const snapshot = createSnapshot();
    const blob = new Blob([snapshot], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "island_snapshot.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Load default island
  const handleLoadDefaultIsland = () => {
    loadSnapshotFromPath("/island/snapshots/default.json");
  };

  return (
    <section>
      {/* Main Toolbar */}
      <Toolbar
        editMode={editMode}
        toggleEditMode={toggleEditMode}
        toolOptions={TOOL_OPTIONS}
        activeTool={activeTool}
        setActiveTool={setActiveTool}
        setPlaceProp={setPlaceProp}
        setSculptProp={setSculptProp}
        sculpt={sculpt}
        openSlider={openSlider}
        setOpenSlider={setOpenSlider}
        setShowHelpModal={setShowHelpModal}
        handleCreateSnapshot={handleCreateSnapshot}
      />

      {/* Modals */}
      <HelpModal show={showHelpModal} onClose={() => setShowHelpModal(false)} />
      <IntroNotification show={showIntroNotification} onDismiss={handleDismissIntro} onCreateNewIsland={handleCreateNewIsland} />
      <CreditsModal show={showCreditsModal} onClose={() => setShowCreditsModal(false)} />

      {/* Additional UI Elements */}
      <CreditsButton onShowCredits={() => setShowCreditsModal(true)} />
      <DefaultIslandButton onLoadDefaultIsland={handleLoadDefaultIsland} />

      {/* Decorations Button */}
      {editMode && <MegaPlaceDecorButton />}

      {/* Delete button */}
      {editMode && <DeleteButton />}
    </section>
  );
}
