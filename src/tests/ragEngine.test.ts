import { describe, it, expect } from 'vitest';
import { RAGEngine } from '../services/ragEngine';
import { NavigationGraphService } from '../services/navigationGraph';

describe('RAG Engine Grounded Search', () => {
    it('should find faculty info for Alan Turing with source citation', () => {
        const result = RAGEngine.query('Where is Dr. Alan Turing cabin?', 'en');
        expect(result.sender).toBe('assistant');
        expect(result.text).toContain('Alan Turing');
        expect(result.sources).toBeDefined();
        expect(result.sources!.length).toBeGreaterThan(0);
        expect(result.navigationAction).toBeDefined();
        expect(result.navigationAction?.toBuildingId).toBe('b-main');
    });

    it('should answer hostel mess menu queries', () => {
        const result = RAGEngine.query('hostel mess menu for dinner', 'en');
        expect(result.text.toLowerCase()).toContain('hostel');
        expect(result.sources?.some(s => s.category.includes('Hostel'))).toBe(true);
    });
});

describe('Navigation Graph A* Pathfinder', () => {
    it('should calculate valid walking path between start kiosk and faculty cabin', () => {
        const route = NavigationGraphService.findRoute('n-kiosk-start', 'n-cabin-hod-cs', false);
        expect(route).not.toBeNull();
        expect(route?.path.length).toBeGreaterThan(1);
        expect(route?.totalDistanceMeters).toBeGreaterThan(0);
        expect(route?.estimatedWalkingMinutes).toBeGreaterThanOrEqual(1);
        expect(route?.steps.length).toBeGreaterThan(0);
    });

    it('should enforce accessible elevator routes when accessibleOnly is true', () => {
        const route = NavigationGraphService.findRoute('n-kiosk-start', 'n-cabin-hod-cs', true);
        expect(route).not.toBeNull();
        expect(route?.isAccessible).toBe(true);
        // Path should avoid staircases
        expect(route?.path.some(n => n.category === 'stairs')).toBe(false);
    });
});
