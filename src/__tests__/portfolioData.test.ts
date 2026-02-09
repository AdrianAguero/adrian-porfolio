import { describe, it, expect } from 'vitest';
import { profile, skills, projects, certifications, knowledge } from '@/lib/portfolioData';

describe('portfolioData', () => {
  describe('knowledge base', () => {
    it('has complete profile information', () => {
      expect(knowledge.profile.name).toBe('Adrián Agüero');
      expect(knowledge.profile.role).toBe('Data Engineer');
      expect(knowledge.profile.location).toBeTruthy();
      expect(knowledge.profile.cv).toMatch(/^https:\/\//);
    });

    it('has work experience entries', () => {
      expect(knowledge.workExperience.helios).toBeDefined();
      expect(knowledge.workExperience.helios.tech.length).toBeGreaterThan(0);
      expect(knowledge.workExperience.neoris).toBeDefined();
      expect(knowledge.workExperience.neoris.tech.length).toBeGreaterThan(0);
    });

    it('has skills in all categories', () => {
      expect(knowledge.skills.primary.length).toBeGreaterThan(0);
      expect(knowledge.skills.secondary.length).toBeGreaterThan(0);
      expect(knowledge.skills.cloud.length).toBeGreaterThan(0);
      expect(knowledge.skills.soft.length).toBeGreaterThan(0);
    });

    it('has career goals', () => {
      expect(knowledge.goals.roles.length).toBeGreaterThan(0);
      expect(knowledge.goals.direction).toBeTruthy();
    });
  });

  describe('profile export', () => {
    it('maps knowledge to Profile interface correctly', () => {
      expect(profile.name).toBe(knowledge.profile.name);
      expect(profile.role).toBe(knowledge.profile.role);
      expect(profile.links.github).toMatch(/github\.com/);
      expect(profile.links.linkedin).toMatch(/linkedin\.com/);
      expect(profile.links.cv).toBe(knowledge.profile.cv);
    });
  });

  describe('skills export', () => {
    it('has skill categories with non-empty arrays', () => {
      expect(skills.length).toBeGreaterThan(0);
      skills.forEach(category => {
        expect(category.name).toBeTruthy();
        expect(category.skills.length).toBeGreaterThan(0);
      });
    });
  });

  describe('projects export', () => {
    it('has at least one project', () => {
      expect(projects.length).toBeGreaterThan(0);
    });

    it('each project has required fields', () => {
      projects.forEach(project => {
        expect(project.id).toBeTruthy();
        expect(project.title).toBeTruthy();
        expect(project.description).toBeTruthy();
        expect(project.techStack.length).toBeGreaterThan(0);
        expect(['COMPLETED', 'IN_PROGRESS', 'HIDDEN']).toContain(project.status);
        expect(['ETL', 'STREAMING', 'WAREHOUSE', 'MLOPS']).toContain(project.diagramType);
      });
    });
  });

  describe('certifications export', () => {
    it('has certifications with required fields', () => {
      expect(certifications.length).toBeGreaterThan(0);
      certifications.forEach(cert => {
        expect(cert.name).toBeTruthy();
        expect(cert.issuer).toBeTruthy();
        expect(cert.date).toBeTruthy();
      });
    });
  });
});
