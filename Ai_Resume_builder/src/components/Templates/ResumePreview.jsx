import React from "react";
import { Page, Text, View, Document, StyleSheet, PDFViewer } from "@react-pdf/renderer";

// Enhanced Styling for a Professional Look
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 12,
    paddingBottom: 6,
    borderBottom: "1 solid #ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 3,
  },
  text: {
    fontSize: 12,
    marginBottom: 2,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skill: {
    fontSize: 12,
    marginRight: 8,
    backgroundColor: "#ddd",
    padding: 3,
    borderRadius: 3,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
    borderBottom: "1 solid #000",
    paddingBottom: 3,
  },
});

const ResumePreview = ({ jsonData }) => {
  if (!jsonData) return <Text>Loading...</Text>;

  return (
    <PDFViewer style={{ width: "100%", height: "600px" }}>
      <Document>
        <Page size="A4" style={styles.page}>

          {/* Header Section */}
          <View style={styles.section}>
            <Text style={styles.title}>{jsonData.name}</Text>
            <Text style={styles.text}>{jsonData.title}</Text>
            {jsonData.contact && (
              <>
                <Text style={styles.text}>{jsonData.contact.email}</Text>
                <Text style={styles.text}>{jsonData.contact.phone}</Text>
                {jsonData.contact.linkedin && <Text style={styles.text}>{jsonData.contact.linkedin}</Text>}
                {jsonData.contact.website && <Text style={styles.text}>{jsonData.contact.website}</Text>}
              </>
            )}
          </View>

          {/* Summary Section */}
          {jsonData.summary && (
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Summary</Text>
              <Text style={styles.text}>{jsonData.summary}</Text>
            </View>
          )}

          {/* Experience Section */}
          {jsonData.experience && jsonData.experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Work Experience</Text>
              {jsonData.experience.map((job, index) => (
                <View key={index} style={{ marginBottom: 6 }}>
                  <Text style={styles.subtitle}>{job.company} - {job.role}</Text>
                  <Text style={styles.text}>{job.years}</Text>
                  <Text style={styles.text}>{job.description}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Education Section */}
          {jsonData.education && jsonData.education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Education</Text>
              {jsonData.education.map((edu, index) => (
                <View key={index} style={{ marginBottom: 6 }}>
                  <Text style={styles.subtitle}>{edu.institution}</Text>
                  <Text style={styles.text}>{edu.degree} ({edu.year})</Text>
                </View>
              ))}
            </View>
          )}

          {/* Research Experience (For Academic CV) */}
          {jsonData.research_experience && jsonData.research_experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Research Experience</Text>
              {jsonData.research_experience.map((research, index) => (
                <View key={index} style={{ marginBottom: 6 }}>
                  <Text style={styles.subtitle}>{research.role} - {research.institution}</Text>
                  <Text style={styles.text}>{research.years}</Text>
                  <Text style={styles.text}>{research.description}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Publications (For Academic CV) */}
          {jsonData.publications && jsonData.publications.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Publications</Text>
              {jsonData.publications.map((pub, index) => (
                <View key={index} style={{ marginBottom: 6 }}>
                  <Text style={styles.subtitle}>{pub.title}</Text>
                  <Text style={styles.text}>{pub.journal} ({pub.year})</Text>
                </View>
              ))}
            </View>
          )}

          {/* Portfolio (For Creative Resume) */}
          {jsonData.portfolio && jsonData.portfolio.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Portfolio</Text>
              {jsonData.portfolio.map((project, index) => (
                <View key={index} style={{ marginBottom: 6 }}>
                  <Text style={styles.subtitle}>{project.title}</Text>
                  <Text style={styles.text}>{project.description}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Skills Section */}
          {jsonData.skills && jsonData.skills.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Skills</Text>
              <View style={styles.skillsContainer}>
                {jsonData.skills.map((skill, index) => (
                  <Text key={index} style={styles.skill}>{skill}</Text>
                ))}
              </View>
            </View>
          )}

          {/* Certifications */}
          {jsonData.certifications && jsonData.certifications.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Certifications</Text>
              {jsonData.certifications.map((cert, index) => (
                <View key={index} style={{ marginBottom: 6 }}>
                  <Text style={styles.subtitle}>{cert}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Conferences (For Academic CV) */}
          {jsonData.conferences && jsonData.conferences.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Conferences</Text>
              {jsonData.conferences.map((conf, index) => (
                <View key={index} style={{ marginBottom: 6 }}>
                  <Text style={styles.subtitle}>{conf.title}</Text>
                  <Text style={styles.text}>{conf.year} - {conf.location}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Awards (For Creative Resume) */}
          {jsonData.awards && jsonData.awards.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Awards & Recognitions</Text>
              {jsonData.awards.map((award, index) => (
                <View key={index} style={{ marginBottom: 6 }}>
                  <Text style={styles.subtitle}>{award.title}</Text>
                  <Text style={styles.text}>{award.organization} ({award.year})</Text>
                </View>
              ))}
            </View>
          )}

        </Page>
      </Document>
    </PDFViewer>
  );
};

export default ResumePreview;
