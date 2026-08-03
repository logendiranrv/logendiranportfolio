import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { onAuthChanged, logOut, ADMIN_EMAIL } from '../firebase';
import { 
  FaSignOutAlt, FaBriefcase, FaGraduationCap, 
  FaCode, FaCertificate, FaPlus, FaTrash, 
  FaEdit, FaHome, FaCheck, FaExclamationTriangle 
} from 'react-icons/fa';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  // Data States
  const [projects, setProjects] = useState([]);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [certificates, setCertificates] = useState([]);

  // Form States
  const [editingId, setEditingId] = useState(null);
  const [projectForm, setProjectForm] = useState({ title: '', description: '', technologies: '', features: '', aim: '', demo: '', github: '', image: '' });
  const [educationForm, setEducationForm] = useState({ degree: '', institution: '', year: '', description: '' });
  const [experienceForm, setExperienceForm] = useState({ title: '', company: '', period: '', description: '' });
  const [certificateForm, setCertificateForm] = useState({ name: '', issuer: '', issue_date: '', credential_url: '', image_url: '' });

  // Get user session & check auth via Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthChanged((currentUser) => {
      if (!currentUser || currentUser.email !== ADMIN_EMAIL) {
        navigate('/login');
      } else {
        setUser(currentUser);
        fetchData();
      }
    });

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  // Fetch all tables
  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: projData, error: projErr } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (projErr) throw projErr;
      setProjects(projData || []);

      const { data: eduData, error: eduErr } = await supabase.from('education').select('*').order('created_at', { ascending: false });
      if (eduErr) throw eduErr;
      setEducation(eduData || []);

      const { data: expData, error: expErr } = await supabase.from('experience').select('*').order('created_at', { ascending: false });
      if (expErr) throw expErr;
      setExperience(expData || []);

      const { data: certData, error: certErr } = await supabase.from('certificates').select('*').order('created_at', { ascending: false });
      if (certErr) throw certErr;
      setCertificates(certData || []);
    } catch (err) {
      showFeedback(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const showFeedback = (msg, type = 'success') => {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleLogout = async () => {
    await logOut();
    navigate('/login');
  };

  // Helper: process comma-separated strings to array
  const parseTags = (str) => {
    if (!str) return [];
    return str.split(',').map(item => item.trim()).filter(item => item.length > 0);
  };

  // Helper: process line break-separated strings to array
  const parseLines = (str) => {
    if (!str) return [];
    return str.split('\n').map(item => item.trim()).filter(item => item.length > 0);
  };

  // CRUD Operations: PROJECTS
  const saveProject = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const techArray = parseTags(projectForm.technologies);
      const featureArray = parseLines(projectForm.features);
      const row = {
        title: projectForm.title,
        description: projectForm.description,
        technologies: techArray,
        features: featureArray,
        aim: projectForm.aim,
        demo: projectForm.demo,
        github: projectForm.github,
        image: projectForm.image,
      };

      if (editingId) {
        const { error } = await supabase.from('projects').update(row).eq('id', editingId);
        if (error) throw error;
        showFeedback('Project updated successfully!');
      } else {
        const { error } = await supabase.from('projects').insert([row]);
        if (error) throw error;
        showFeedback('Project created successfully!');
      }

      setProjectForm({ title: '', description: '', technologies: '', features: '', aim: '', demo: '', github: '', image: '' });
      setEditingId(null);
      fetchData();
    } catch (err) {
      showFeedback(err.message, 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const editProject = (proj) => {
    setEditingId(proj.id);
    setProjectForm({
      title: proj.title,
      description: proj.description,
      technologies: proj.technologies ? proj.technologies.join(', ') : '',
      features: proj.features ? proj.features.join('\n') : '',
      aim: proj.aim || '',
      demo: proj.demo || '',
      github: proj.github || '',
      image: proj.image || '',
    });
  };

  const deleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    setActionLoading(true);
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      showFeedback('Project deleted successfully!');
      fetchData();
    } catch (err) {
      showFeedback(err.message, 'error');
    } finally {
      setActionLoading(false);
    }
  };

  // CRUD Operations: EDUCATION
  const saveEducation = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      if (editingId) {
        const { error } = await supabase.from('education').update(educationForm).eq('id', editingId);
        if (error) throw error;
        showFeedback('Education details updated!');
      } else {
        const { error } = await supabase.from('education').insert([educationForm]);
        if (error) throw error;
        showFeedback('Education details created!');
      }
      setEducationForm({ degree: '', institution: '', year: '', description: '' });
      setEditingId(null);
      fetchData();
    } catch (err) {
      showFeedback(err.message, 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const editEducation = (edu) => {
    setEditingId(edu.id);
    setEducationForm({
      degree: edu.degree,
      institution: edu.institution,
      year: edu.year,
      description: edu.description,
    });
  };

  const deleteEducation = async (id) => {
    if (!window.confirm('Delete this education entry?')) return;
    setActionLoading(true);
    try {
      const { error } = await supabase.from('education').delete().eq('id', id);
      if (error) throw error;
      showFeedback('Education deleted!');
      fetchData();
    } catch (err) {
      showFeedback(err.message, 'error');
    } finally {
      setActionLoading(false);
    }
  };

  // CRUD Operations: EXPERIENCE
  const saveExperience = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      if (editingId) {
        const { error } = await supabase.from('experience').update(experienceForm).eq('id', editingId);
        if (error) throw error;
        showFeedback('Experience updated!');
      } else {
        const { error } = await supabase.from('experience').insert([experienceForm]);
        if (error) throw error;
        showFeedback('Experience created!');
      }
      setExperienceForm({ title: '', company: '', period: '', description: '' });
      setEditingId(null);
      fetchData();
    } catch (err) {
      showFeedback(err.message, 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const editExperience = (exp) => {
    setEditingId(exp.id);
    setExperienceForm({
      title: exp.title,
      company: exp.company,
      period: exp.period,
      description: exp.description,
    });
  };

  const deleteExperience = async (id) => {
    if (!window.confirm('Delete this experience entry?')) return;
    setActionLoading(true);
    try {
      const { error } = await supabase.from('experience').delete().eq('id', id);
      if (error) throw error;
      showFeedback('Experience deleted!');
      fetchData();
    } catch (err) {
      showFeedback(err.message, 'error');
    } finally {
      setActionLoading(false);
    }
  };

  // CRUD Operations: CERTIFICATES
  const saveCertificate = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      if (editingId) {
        const { error } = await supabase.from('certificates').update(certificateForm).eq('id', editingId);
        if (error) throw error;
        showFeedback('Certificate updated!');
      } else {
        const { error } = await supabase.from('certificates').insert([certificateForm]);
        if (error) throw error;
        showFeedback('Certificate created!');
      }
      setCertificateForm({ name: '', issuer: '', issue_date: '', credential_url: '', image_url: '' });
      setEditingId(null);
      fetchData();
    } catch (err) {
      showFeedback(err.message, 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const editCertificate = (cert) => {
    setEditingId(cert.id);
    setCertificateForm({
      name: cert.name,
      issuer: cert.issuer,
      issue_date: cert.issue_date,
      credential_url: cert.credential_url || '',
      image_url: cert.image_url || '',
    });
  };

  const deleteCertificate = async (id) => {
    if (!window.confirm('Delete this certificate?')) return;
    setActionLoading(true);
    try {
      const { error } = await supabase.from('certificates').delete().eq('id', id);
      if (error) throw error;
      showFeedback('Certificate deleted!');
      fetchData();
    } catch (err) {
      showFeedback(err.message, 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const cancelEditing = () => {
    setEditingId(null);
    setProjectForm({ title: '', description: '', technologies: '', features: '', aim: '', demo: '', github: '', image: '' });
    setEducationForm({ degree: '', institution: '', year: '', description: '' });
    setExperienceForm({ title: '', company: '', period: '', description: '' });
    setCertificateForm({ name: '', issuer: '', issue_date: '', credential_url: '', image_url: '' });
  };

  return (
    <div style={styles.dashboardContainer}>
      {/* Header Bar */}
      <header style={styles.header}>
        <div style={styles.headerTitle}>
          <h2>Admin Dashboard</h2>
          <span style={styles.userEmail}>{user?.email}</span>
        </div>
        <div style={styles.headerButtons}>
          <button onClick={() => navigate('/')} style={styles.navBtn}>
            <FaHome style={{ marginRight: '6px' }} /> View Site
          </button>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            <FaSignOutAlt style={{ marginRight: '6px' }} /> Logout
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div style={styles.mainGrid}>
        {/* Navigation Sidebar */}
        <aside style={styles.sidebar}>
          <button 
            style={activeTab === 'projects' ? styles.activeSidebarBtn : styles.sidebarBtn}
            onClick={() => { setActiveTab('projects'); cancelEditing(); }}
          >
            <FaCode style={styles.tabIcon} /> Projects
          </button>
          <button 
            style={activeTab === 'education' ? styles.activeSidebarBtn : styles.sidebarBtn}
            onClick={() => { setActiveTab('education'); cancelEditing(); }}
          >
            <FaGraduationCap style={styles.tabIcon} /> Education
          </button>
          <button 
            style={activeTab === 'experience' ? styles.activeSidebarBtn : styles.sidebarBtn}
            onClick={() => { setActiveTab('experience'); cancelEditing(); }}
          >
            <FaBriefcase style={styles.tabIcon} /> Experience
          </button>
          <button 
            style={activeTab === 'certificates' ? styles.activeSidebarBtn : styles.sidebarBtn}
            onClick={() => { setActiveTab('certificates'); cancelEditing(); }}
          >
            <FaCertificate style={styles.tabIcon} /> Certificates
          </button>
        </aside>

        {/* Action Panel */}
        <main style={styles.content}>
          {message && (
            <div style={message.type === 'error' ? styles.errorBanner : styles.successBanner}>
              {message.type === 'error' ? <FaExclamationTriangle style={{ marginRight: '10px' }} /> : <FaCheck style={{ marginRight: '10px' }} />}
              {message.text}
            </div>
          )}

          {loading ? (
            <div style={styles.loadingContainer}>Loading Data...</div>
          ) : (
            <div style={styles.tabContentGrid}>
              
              {/* Form Section */}
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>
                  {editingId ? <FaEdit style={{ marginRight: '8px' }} /> : <FaPlus style={{ marginRight: '8px' }} />}
                  {editingId ? 'Edit Record' : 'Add New Record'}
                </h3>
                
                {/* 1. Projects Form */}
                {activeTab === 'projects' && (
                  <form onSubmit={saveProject} style={styles.form}>
                    <input 
                      type="text" 
                      placeholder="Project Title"
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      required 
                      style={styles.input}
                    />
                    <textarea 
                      placeholder="Description"
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      required 
                      rows="4"
                      style={styles.input}
                    />
                    <input 
                      type="text" 
                      placeholder="Technologies (comma-separated, e.g. React, Node, CSS)"
                      value={projectForm.technologies}
                      onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                      required 
                      style={styles.input}
                    />
                    <textarea 
                      placeholder="Key Features (one feature per line)"
                      value={projectForm.features}
                      onChange={(e) => setProjectForm({ ...projectForm, features: e.target.value })}
                      rows="4"
                      style={styles.input}
                    />
                    <input 
                      type="url" 
                      placeholder="Live Demo URL (e.g. https://myproject.com)"
                      value={projectForm.demo}
                      onChange={(e) => setProjectForm({ ...projectForm, demo: e.target.value })}
                      style={styles.input}
                    />
                    <input 
                      type="url" 
                      placeholder="GitHub URL (e.g. https://github.com/logendiranrv/repo)"
                      value={projectForm.github}
                      onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })}
                      style={styles.input}
                    />
                    <input 
                      type="url" 
                      placeholder="Project Image URL (e.g. https://images.unsplash.com/...)"
                      value={projectForm.image}
                      onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                      style={styles.input}
                    />
                    
                    <div style={styles.formActions}>
                      <button type="submit" disabled={actionLoading} style={styles.submitBtn}>
                        {actionLoading ? 'Saving...' : 'Save Project'}
                      </button>
                      {editingId && <button type="button" onClick={cancelEditing} style={styles.cancelBtn}>Cancel</button>}
                    </div>
                  </form>
                )}

                {/* 2. Education Form */}
                {activeTab === 'education' && (
                  <form onSubmit={saveEducation} style={styles.form}>
                    <input 
                      type="text" 
                      placeholder="Degree / Qualification"
                      value={educationForm.degree}
                      onChange={(e) => setEducationForm({ ...educationForm, degree: e.target.value })}
                      required 
                      style={styles.input}
                    />
                    <input 
                      type="text" 
                      placeholder="Institution"
                      value={educationForm.institution}
                      onChange={(e) => setEducationForm({ ...educationForm, institution: e.target.value })}
                      required 
                      style={styles.input}
                    />
                    <input 
                      type="text" 
                      placeholder="Year (e.g. May 2027 or 2021 - 2025)"
                      value={educationForm.year}
                      onChange={(e) => setEducationForm({ ...educationForm, year: e.target.value })}
                      required 
                      style={styles.input}
                    />
                    <input 
                      type="text" 
                      placeholder="Description / Grade (e.g. CGPA: 7.3 / 10)"
                      value={educationForm.description}
                      onChange={(e) => setEducationForm({ ...educationForm, description: e.target.value })}
                      required 
                      style={styles.input}
                    />
                    
                    <div style={styles.formActions}>
                      <button type="submit" disabled={actionLoading} style={styles.submitBtn}>
                        {actionLoading ? 'Saving...' : 'Save Education'}
                      </button>
                      {editingId && <button type="button" onClick={cancelEditing} style={styles.cancelBtn}>Cancel</button>}
                    </div>
                  </form>
                )}

                {/* 3. Experience Form */}
                {activeTab === 'experience' && (
                  <form onSubmit={saveExperience} style={styles.form}>
                    <input 
                      type="text" 
                      placeholder="Job / Internship Title"
                      value={experienceForm.title}
                      onChange={(e) => setExperienceForm({ ...experienceForm, title: e.target.value })}
                      required 
                      style={styles.input}
                    />
                    <input 
                      type="text" 
                      placeholder="Company"
                      value={experienceForm.company}
                      onChange={(e) => setExperienceForm({ ...experienceForm, company: e.target.value })}
                      required 
                      style={styles.input}
                    />
                    <input 
                      type="text" 
                      placeholder="Period (e.g. Dec 2024)"
                      value={experienceForm.period}
                      onChange={(e) => setExperienceForm({ ...experienceForm, period: e.target.value })}
                      required 
                      style={styles.input}
                    />
                    <textarea 
                      placeholder="Description of duties/tech used"
                      value={experienceForm.description}
                      onChange={(e) => setExperienceForm({ ...experienceForm, description: e.target.value })}
                      required 
                      rows="3"
                      style={styles.input}
                    />
                    
                    <div style={styles.formActions}>
                      <button type="submit" disabled={actionLoading} style={styles.submitBtn}>
                        {actionLoading ? 'Saving...' : 'Save Experience'}
                      </button>
                      {editingId && <button type="button" onClick={cancelEditing} style={styles.cancelBtn}>Cancel</button>}
                    </div>
                  </form>
                )}

                {/* 4. Certificates Form */}
                {activeTab === 'certificates' && (
                  <form onSubmit={saveCertificate} style={styles.form}>
                    <input 
                      type="text" 
                      placeholder="Certificate Name"
                      value={certificateForm.name}
                      onChange={(e) => setCertificateForm({ ...certificateForm, name: e.target.value })}
                      required 
                      style={styles.input}
                    />
                    <input 
                      type="text" 
                      placeholder="Issuer (e.g. Coursera, CSK Academy)"
                      value={certificateForm.issuer}
                      onChange={(e) => setCertificateForm({ ...certificateForm, issuer: e.target.value })}
                      required 
                      style={styles.input}
                    />
                    <input 
                      type="text" 
                      placeholder="Issue Date (e.g. Jan 2025)"
                      value={certificateForm.issue_date}
                      onChange={(e) => setCertificateForm({ ...certificateForm, issue_date: e.target.value })}
                      required 
                      style={styles.input}
                    />
                    <input 
                      type="url" 
                      placeholder="Credential URL (Optional)"
                      value={certificateForm.credential_url}
                      onChange={(e) => setCertificateForm({ ...certificateForm, credential_url: e.target.value })}
                      style={styles.input}
                    />
                    <input 
                      type="url" 
                      placeholder="Certificate Image URL (Optional)"
                      value={certificateForm.image_url}
                      onChange={(e) => setCertificateForm({ ...certificateForm, image_url: e.target.value })}
                      style={styles.input}
                    />
                    
                    <div style={styles.formActions}>
                      <button type="submit" disabled={actionLoading} style={styles.submitBtn}>
                        {actionLoading ? 'Saving...' : 'Save Certificate'}
                      </button>
                      {editingId && <button type="button" onClick={cancelEditing} style={styles.cancelBtn}>Cancel</button>}
                    </div>
                  </form>
                )}
              </div>

              {/* Data Table List Section */}
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>Existing Records</h3>
                <div style={styles.listContainer}>
                  
                  {activeTab === 'projects' && (
                    projects.length === 0 ? <p style={styles.noData}>No projects found. Add one on the left!</p> :
                    projects.map(proj => (
                      <div key={proj.id} style={styles.listItem}>
                        <div style={styles.listItemText}>
                          <h4>{proj.title}</h4>
                          <span style={styles.techText}>{proj.technologies ? proj.technologies.join(', ') : ''}</span>
                        </div>
                        <div style={styles.listItemActions}>
                          <button onClick={() => editProject(proj)} style={styles.iconBtnEdit} title="Edit"><FaEdit /></button>
                          <button onClick={() => deleteProject(proj.id)} style={styles.iconBtnDelete} title="Delete"><FaTrash /></button>
                        </div>
                      </div>
                    ))
                  )}

                  {activeTab === 'education' && (
                    education.length === 0 ? <p style={styles.noData}>No education entries found.</p> :
                    education.map(edu => (
                      <div key={edu.id} style={styles.listItem}>
                        <div style={styles.listItemText}>
                          <h4>{edu.degree}</h4>
                          <span style={styles.techText}>{edu.institution} ({edu.year})</span>
                        </div>
                        <div style={styles.listItemActions}>
                          <button onClick={() => editEducation(edu)} style={styles.iconBtnEdit} title="Edit"><FaEdit /></button>
                          <button onClick={() => deleteEducation(edu.id)} style={styles.iconBtnDelete} title="Delete"><FaTrash /></button>
                        </div>
                      </div>
                    ))
                  )}

                  {activeTab === 'experience' && (
                    experience.length === 0 ? <p style={styles.noData}>No experience entries found.</p> :
                    experience.map(exp => (
                      <div key={exp.id} style={styles.listItem}>
                        <div style={styles.listItemText}>
                          <h4>{exp.title}</h4>
                          <span style={styles.techText}>{exp.company} ({exp.period})</span>
                        </div>
                        <div style={styles.listItemActions}>
                          <button onClick={() => editExperience(exp)} style={styles.iconBtnEdit} title="Edit"><FaEdit /></button>
                          <button onClick={() => deleteExperience(exp.id)} style={styles.iconBtnDelete} title="Delete"><FaTrash /></button>
                        </div>
                      </div>
                    ))
                  )}

                  {activeTab === 'certificates' && (
                    certificates.length === 0 ? <p style={styles.noData}>No certificates found.</p> :
                    certificates.map(cert => (
                      <div key={cert.id} style={styles.listItem}>
                        <div style={styles.listItemText}>
                          <h4>{cert.name}</h4>
                          <span style={styles.techText}>{cert.issuer} - {cert.issue_date}</span>
                        </div>
                        <div style={styles.listItemActions}>
                          <button onClick={() => editCertificate(cert)} style={styles.iconBtnEdit} title="Edit"><FaEdit /></button>
                          <button onClick={() => deleteCertificate(cert.id)} style={styles.iconBtnDelete} title="Delete"><FaTrash /></button>
                        </div>
                      </div>
                    ))
                  )}

                </div>
              </div>

            </div>
          )}
        </main>
      </div>
    </div>
  );
};

const styles = {
  dashboardContainer: {
    minHeight: '100vh',
    backgroundColor: '#111111',
    color: '#ffffff',
    fontFamily: "'Inter', sans-serif",
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 40px',
    background: 'rgba(15, 23, 42, 0.95)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  headerTitle: {
    display: 'flex',
    flexDirection: 'column',
  },
  userEmail: {
    fontSize: '0.85rem',
    color: '#a3a3a3',
    marginTop: '4px',
  },
  headerButtons: {
    display: 'flex',
    gap: '15px',
  },
  navBtn: {
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    color: '#ffffff',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    fontWeight: '600',
    transition: 'all 0.3s ease',
  },
  logoutBtn: {
    background: 'rgba(239, 68, 68, 0.12)',
    border: '1px solid rgba(239, 68, 68, 0.25)',
    color: '#ef4444',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    fontWeight: '600',
    transition: 'all 0.3s ease',
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '260px 1fr',
    flex: 1,
    minHeight: 'calc(100vh - 80px)',
  },
  sidebar: {
    background: 'rgba(20, 20, 20, 0.8)',
    borderRight: '1px solid rgba(255, 255, 255, 0.08)',
    padding: '30px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  sidebarBtn: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '14px 18px',
    background: 'transparent',
    border: 'none',
    borderRadius: '8px',
    color: '#a3a3a3',
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'all 0.3s ease',
  },
  activeSidebarBtn: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '14px 18px',
    background: 'linear-gradient(135deg, #ffffff 0%, #d4d4d4 100%)',
    border: 'none',
    borderRadius: '8px',
    color: '#111111',
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: '1rem',
    fontWeight: '700',
    boxShadow: '0 4px 12px rgba(255, 255, 255, 0.15)',
  },
  tabIcon: {
    marginRight: '12px',
    fontSize: '1.1rem',
  },
  content: {
    padding: '40px',
    background: '#141414',
    overflowY: 'auto',
  },
  successBanner: {
    background: 'rgba(76, 175, 80, 0.15)',
    border: '1px solid rgba(76, 175, 80, 0.3)',
    color: '#4caf50',
    padding: '15px 20px',
    borderRadius: '8px',
    marginBottom: '30px',
    display: 'flex',
    alignItems: 'center',
    fontWeight: '500',
  },
  errorBanner: {
    background: 'rgba(239, 68, 68, 0.15)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    color: '#ef4444',
    padding: '15px 20px',
    borderRadius: '8px',
    marginBottom: '30px',
    display: 'flex',
    alignItems: 'center',
    fontWeight: '500',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
    fontSize: '1.2rem',
    color: '#a3a3a3',
  },
  tabContentGrid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: '30px',
    alignItems: 'start',
  },
  card: {
    background: 'rgba(30, 30, 30, 0.6)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: '30px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
  },
  cardTitle: {
    fontSize: '1.3rem',
    fontWeight: '700',
    marginBottom: '25px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    paddingBottom: '12px',
    display: 'flex',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    background: 'rgba(0, 0, 0, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  formActions: {
    display: 'flex',
    gap: '12px',
    marginTop: '10px',
  },
  submitBtn: {
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #ffffff 0%, #d4d4d4 100%)',
    color: '#111111',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  cancelBtn: {
    padding: '12px 24px',
    background: 'transparent',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: '#ffffff',
    borderRadius: '8px',
    fontSize: '0.95rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    maxHeight: '500px',
    overflowY: 'auto',
    paddingRight: '5px',
  },
  noData: {
    color: '#a3a3a3',
    textAlign: 'center',
    padding: '30px 0',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    background: 'rgba(0, 0, 0, 0.3)',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
  },
  listItemText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    maxWidth: '75%',
  },
  techText: {
    fontSize: '0.8rem',
    color: '#a3a3a3',
  },
  listItemActions: {
    display: 'flex',
    gap: '8px',
  },
  iconBtnEdit: {
    background: 'rgba(255, 255, 255, 0.06)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    width: '36px',
    height: '36px',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
  },
  iconBtnDelete: {
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    color: '#ef4444',
    width: '36px',
    height: '36px',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
  },
};

export default AdminDashboard;
