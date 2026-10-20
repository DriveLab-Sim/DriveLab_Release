# DriveLab

Virtueller Fahrzeugzwilling für Fahrdynamik und Steuergeräte.

DriveLab simuliert ein Fahrzeug auf einer Strecke und wertet die Fahrt aus. Fahrzeug, Komponenten und Strecke stehen in JSON-Dateien; Steuergeräte hängen als eigene DLLs an einem virtuellen CAN-Bus.

- **Fahrzeugmodelle:** Einspur, Zweispur, Mehrkörper (MKS)
- **Komponenten:** Reifen (auch `.tir`), Antrieb, HV-Akku, Bremse, Lenkung, Aero, Achskinematik, Federung – austauschbar über `"type"`
- **Steuergeräte:** C/C++-SDK, DBC, Bus-Mitschnitt
- **Strecken:** eigenes Streckenformat und OpenDRIVE
- **Auswertung:** Lauf-Reports, Komponenten-Datenblätter (`inspect`), Standardmanöver (`assess`)
- **Python:** Simulation schrittweise steuern, z. B. für eigene Fahrer oder Regler

## Schnellstart

    drivelab new MeinFahrzeug
    drivelab run MeinFahrzeug
    drivelab report MeinFahrzeug --open

Handbuch: `drivelab docs`

Status: Alpha, Windows.