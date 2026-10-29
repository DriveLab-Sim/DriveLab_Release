# DriveLab

Virtueller Fahrzeugzwilling für Fahrdynamik und Steuergeräte.

DriveLab simuliert ein Fahrzeug auf einer Strecke und wertet die Fahrt aus. Fahrzeug, Komponenten und Strecke stehen in JSON-Dateien; Steuergeräte hängen als eigene DLLs an virtuellen CAN-Bussen.

- **Fahrzeugmodelle:** Einspur, Zweispur, Mehrkörper (MKS)
- **Komponenten:** Reifen (auch `.tir`), Antrieb (auch direkt aus dem Motor-Datenblatt), HV-Akku, Bremse, Lenkung, Aero, Achskinematik, Federung mit Wippe und Dämpferkennlinie – austauschbar über `"type"`
- **Steuergeräte:** C/C++-SDK, mehrere CAN-Busse nach DBC, Bus-Mitschnitt, Fahrzeuglogs abspielen
- **Strecken:** eigenes Streckenformat und OpenDRIVE
- **Auswertung:** Lauf-Reports, Komponenten-Datenblätter (`inspect`), Standardmanöver (`assess`)
- **Python:** Simulation schrittweise steuern, z. B. für eigene Fahrer oder Regler

## Schnellstart

    drivelab new MeinFahrzeug
    drivelab run MeinFahrzeug
    drivelab report MeinFahrzeug --open

[Download](https://github.com/DriveLab-Sim/DriveLab_Release/releases/latest) · [Handbuch](https://drivelab-sim.github.io/DriveLab_Release/) (lokal: `drivelab docs`) · [Stand & Roadmap](https://drivelab-sim.github.io/DriveLab_Release/stand.html)

Status: Alpha, Windows.
