export type Document = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

export const documents: Document[] = [
  {
    id: 'doc-1',
    title: 'The Principles of Project Management',
    createdAt: '2024-05-10',
    content: `Project management is the process of leading the work of a team to achieve all project goals within the given constraints. This information is usually described in project documentation, created at the beginning of the development process. The primary constraints are scope, time, and budget. The secondary challenge is to optimize the allocation of necessary inputs and apply them to meet pre-defined objectives. The objective of project management is to produce a complete project which complies with the client's objectives. In many cases, the objective of project management is also to shape or reform the client's brief to feasibly address the client's objectives. Once the client's objectives are clearly established, they should influence all decisions made by other people involved in the project – for example, project managers, designers, contractors, and sub-contractors. Ill-defined or too tightly prescribed project management objectives are detrimental to decision making. A project is a temporary endeavor with a defined beginning and end (usually time-constrained, and often constrained by funding or deliverables) that is undertaken to meet unique goals and objectives, typically to bring about beneficial change or added value. The temporary nature of projects stands in contrast with business as usual (or operations), which are repetitive, permanent, or semi-permanent functional activities to produce products or services. In practice, the management of these two systems is often quite different, and as such requires the development of distinct technical skills and management strategies.`
  },
  {
    id: 'doc-2',
    title: 'An Introduction to Machine Learning',
    createdAt: '2024-05-12',
    content: `Machine learning (ML) is a field of inquiry devoted to understanding and building methods that 'learn', that is, methods that leverage data to improve performance on some set of tasks. It is seen as a part of artificial intelligence. Machine learning algorithms build a model based on sample data, known as training data, in order to make predictions or decisions without being explicitly programmed to do so. Machine learning algorithms are used in a wide variety of applications, such as in medicine, email filtering, speech recognition, and computer vision, where it is difficult or unfeasible to develop conventional algorithms to perform the needed tasks. A subset of machine learning is closely related to computational statistics, which focuses on making predictions using computers, but not all machine learning is statistical learning. The study of mathematical optimization delivers methods, theory and application domains to the field of machine learning. Data mining is a related field of study, focusing on exploratory data analysis through unsupervised learning. Some implementations of machine learning use data and neural networks in a way that mimics the working of a biological brain. In its application across business problems, machine learning is also referred to as predictive analytics.`
  },
  {
    id: 'doc-3',
    title: 'The History of The Internet',
    createdAt: '2024-05-15',
    content: `The history of the Internet has its origin in the efforts to build and interconnect computer networks that arose from research and development in the United States and involved international collaboration, particularly with researchers in the United Kingdom and France. Computer science was an emerging discipline in the late 1950s that began to consider time-sharing between computer users, and later, the possibility of achieving this over wide area networks. Independently, Paul Baran proposed a distributed network based on data in message blocks in the early 1960s and Donald Davies conceived of packet switching in 1965 at the National Physical Laboratory (NPL) in the UK, which became a building block for the development of the ARPANET. The ARPANET was a pioneering network that was developed by the Advanced Research Projects Agency (ARPA) of the U.S. Department of Defense. The project was launched in 1969. The first two nodes of what would become the ARPANET were interconnected between Leonard Kleinrock's Network Measurement Center at the University of California, Los Angeles (UCLA) and Douglas Engelbart's NLS system at SRI International (SRI) in Menlo Park, California, on 29 October 1969. Access to the ARPANET was expanded in 1981 when the National Science Foundation (NSF) funded the Computer Science Network (CSNET). In 1982, the Internet protocol suite (TCP/IP) was standardized, which permitted worldwide proliferation of interconnected networks.`
  },
];
