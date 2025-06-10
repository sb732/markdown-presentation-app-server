
const { Slide } = require('../models');
const { v4: uuidv4 } = require('uuid');

const defaultSlides = [
  {
    title: 'Markdown Slide Deck Application',
    content: `# Markdown Slide Deck Application

## Architecture, Design & Development Journey

Built with React, Node.js, and SQLite

A comprehensive overview of our presentation application`,
    layout: 'title'
  },
  {
    title: 'Application Architecture',
    content: `## Application Architecture

### Frontend Stack
- React 18 with TypeScript
- Tailwind CSS for styling
- Tanstack Query for data fetching
- Vite as build tool

### Backend Stack
- Node.js with Express.js
- SQLite database with Sequelize ORM
- RESTful API design
- CORS enabled for cross-origin requests`,
    layout: 'two-column'
  },
  {
    title: 'System Components',
    content: `## Key System Components

### Core Components
- SlideDeck - Main presentation container
- SlideRenderer - Markdown to React rendering
- SlideEditor - Live markdown editor
- SlideNavigation - Presentation controls

### Services & Utilities
- slideService - API communication layer
- MarkdownParser - AST generation & layout detection
- apiService - HTTP request abstraction

### Database Layer
- Slide model with Sequelize
- UUID primary keys for scalability
- Timestamps for audit trails`,
    layout: 'content'
  },
  {
    title: 'Data Flow Architecture',
    content: `## Data Flow Architecture

\`\`\`mermaid
graph TD
    A[React Frontend] --> B[Tanstack Query]
    B --> C[slideService]
    C --> D[API Service]
    D --> E[Express Routes]
    E --> F[Slide Controller]
    F --> G[Sequelize ORM]
    G --> H[SQLite Database]
    
    I[Markdown Content] --> J[MarkdownParser]
    J --> K[AST Nodes]
    K --> L[SlideRenderer]
    L --> M[Rendered UI]
\`\`\``,
    layout: 'code'
  },
  {
    title: 'Design Considerations',
    content: `## Key Design Decisions

### 1. Markdown-First Approach
- Why: Universal format, easy to learn
- Future: Export to other formats (PDF, PPTX)

### 2. Real-time Preview
- Why: Immediate feedback improves UX
- Implementation: Live parsing and rendering

### 3. Layout Auto-detection
- Why: Reduces manual configuration
- Algorithm: AST analysis for optimal layouts

### 4. RESTful API Design
- Why: Standard, scalable, cacheable
- Future: GraphQL for complex queries`,
    layout: 'content'
  },
  {
    title: 'Database Design Choices',
    content: `## Database Architecture

### SQLite Selection
- Pros: Lightweight, serverless, perfect for demos
- Cons: Single-writer limitation
- Future: Easy migration to PostgreSQL

### Schema Design
\`\`\`sql
CREATE TABLE Slides (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  layout ENUM('title', 'content', 'two-column', 'code'),
  order INTEGER NOT NULL,
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
);
\`\`\``,
    layout: 'code'
  },
  {
    title: 'State Management Strategy',
    content: `## State Management Approach

### Tanstack Query Benefits
- Server State: Automatic caching & synchronization
- Optimistic Updates: Better perceived performance
- Error Handling: Built-in retry mechanisms
- Background Refetching: Always fresh data

### Local State
- React useState: Component-level state
- No Redux: Avoided complexity for this scope
- Future: Consider Zustand for complex client state`,
    layout: 'content'
  },
  {
    title: 'Key Technical Challenges',
    content: `## Development Challenges

### 1. Markdown Parsing Complexity
- Challenge: Converting markdown to structured AST
- Solution: Custom parser with layout detection
- Learning: Regex patterns for markdown syntax

### 2. Real-time Editor Performance
- Challenge: Re-parsing on every keystroke
- Solution: Debounced updates and memoization
- Future: Web Workers for heavy parsing

### 3. Slide Synchronization
- Challenge: Frontend-backend state consistency
- Solution: Tanstack Query invalidation strategy
- Learning: Optimistic updates vs data integrity`,
    layout: 'content'
  },
  {
    title: 'Code Quality Decisions',
    content: `## Code Quality & Maintainability

### TypeScript Integration
- Full type safety across frontend and API interfaces
- Interface definitions for all data structures
- Generic API service for reusable HTTP operations

### Component Architecture
- Single Responsibility - focused components
- Composition over inheritance - flexible layouts
- Props drilling avoided - service layer abstraction

### Error Handling Strategy
- Graceful degradation - fallback to empty states
- User-friendly messages - no technical jargon
- Comprehensive logging - debugging and monitoring`,
    layout: 'content'
  },
  {
    title: 'Performance Optimizations',
    content: `## Performance Considerations

### Frontend Optimizations
- React.memo for expensive renders
- useCallback for stable function references
- Lazy loading for large presentations
- Virtualization planned for 100+ slides

### Backend Optimizations
- Database indexing on order and id fields
- Connection pooling for concurrent requests
- Response compression for large content
- Caching headers for static assets`,
    layout: 'two-column'
  },
  {
    title: 'Security & Scalability',
    content: `## Security & Future Scale

### Current Security Measures
- Input sanitization for markdown content
- CORS configuration for cross-origin safety
- Helmet.js for security headers
- Request size limits to prevent abuse

### Scalability Considerations
- Stateless API design for horizontal scaling
- Database abstraction for easy migration
- Modular frontend for code splitting
- CDN-ready static asset organization`,
    layout: 'content'
  },
  {
    title: 'Future Roadmap',
    content: `## Planned Enhancements

### Short-term Features
- Slide templates for quick start
- Image upload and media management
- Export functionality (PDF, images)
- Presentation sharing via public links

### Long-term Vision
- Collaborative editing with real-time sync
- Plugin system for custom components
- Analytics dashboard for presentation insights
- Mobile app for remote presentation control`,
    layout: 'content'
  },
  {
    title: 'Key Takeaways',
    content: `## Development Insights

### Technical Learnings
- Markdown parsing is more complex than expected
- Real-time updates require careful state management
- TypeScript significantly improves development speed
- Component composition scales better than inheritance

### Process Insights
- Start simple - SQLite before PostgreSQL
- User feedback early - live preview was crucial
- Performance later - functionality first approach
- Documentation - self-documenting code wins

### Architecture Wins
- Service layer abstraction enabled easy testing
- Type safety caught bugs before runtime
- Modular design made refactoring painless`,
    layout: 'content'
  },
  {
    title: 'Thank You!',
    content: `# Questions & Discussion

## This presentation was created using our own application! 

### Key Stats
- 14 slides generated from markdown
- Auto-detected layouts for optimal presentation
- Real-time editing capabilities demonstrated
- Full-stack solution from database to UI

Demonstrating the power of markdown-driven presentations ✨`,
    layout: 'title'
  }
];

const createDefaultSlides = async () => {
  // Clear existing slides first to prevent duplicates
  await Slide.destroy({ where: {} });
  
  const slidePromises = defaultSlides.map((slideData, index) => 
    Slide.create({
      id: uuidv4(),
      title: slideData.title,
      content: slideData.content,
      layout: slideData.layout,
      order: index,
    })
  );

  await Promise.all(slidePromises);
};

const slideController = {
  // Get all slides
  async getAllSlides(req, res) {
    try {
      let slides = await Slide.findAll({
        order: [['order', 'ASC']],
      });

      // Create default slides if none exist
      if (slides.length === 0) {
        console.log('No slides found, creating default slides...');
        await createDefaultSlides();
        slides = await Slide.findAll({
          order: [['order', 'ASC']],
        });
        console.log('Created default slides:', slides.length);
      }

      res.json(slides);
    } catch (error) {
      console.error('Error fetching slides:', error);
      res.status(500).json({ error: 'Failed to fetch slides' });
    }
  },

  // Create new slide
  async createSlide(req, res) {
    try {
      const { title, content, layout, order } = req.body;
      
      const slide = await Slide.create({
        id: uuidv4(),
        title: title || 'Untitled Slide',
        content: content || '',
        layout: layout || 'content',
        order: order || 0,
      });

      res.status(201).json(slide);
    } catch (error) {
      console.error('Error creating slide:', error);
      res.status(500).json({ error: 'Failed to create slide' });
    }
  },

  // Update slide
  async updateSlide(req, res) {
    try {
      const { id } = req.params;
      const { title, content, layout, order } = req.body;

      const slide = await Slide.findByPk(id);
      if (!slide) {
        return res.status(404).json({ error: 'Slide not found' });
      }

      await slide.update({
        title: title !== undefined ? title : slide.title,
        content: content !== undefined ? content : slide.content,
        layout: layout !== undefined ? layout : slide.layout,
        order: order !== undefined ? order : slide.order,
      });

      res.json(slide);
    } catch (error) {
      console.error('Error updating slide:', error);
      res.status(500).json({ error: 'Failed to update slide' });
    }
  },

  // Delete slide
  async deleteSlide(req, res) {
    try {
      const { id } = req.params;
      const slide = await Slide.findByPk(id);
      
      if (!slide) {
        return res.status(404).json({ error: 'Slide not found' });
      }

      await slide.destroy();
      res.json({ message: 'Slide deleted successfully' });
    } catch (error) {
      console.error('Error deleting slide:', error);
      res.status(500).json({ error: 'Failed to delete slide' });
    }
  },

  // Update all slides (for bulk updates)
  async updateAllSlides(req, res) {
    try {
      const { slides } = req.body;

      if (!slides || !Array.isArray(slides)) {
        return res.status(400).json({ error: 'Invalid slides data' });
      }

      // Delete existing slides
      await Slide.destroy({ where: {} });
      
      // Create updated slides
      const slidePromises = slides.map((slide, index) => 
        Slide.create({
          ...slide,
          id: slide.id || uuidv4(),
          order: index,
        })
      );
      
      const updatedSlides = await Promise.all(slidePromises);
      res.json(updatedSlides);
    } catch (error) {
      console.error('Error updating slides:', error);
      res.status(500).json({ error: 'Failed to update slides' });
    }
  },
};

module.exports = slideController;
