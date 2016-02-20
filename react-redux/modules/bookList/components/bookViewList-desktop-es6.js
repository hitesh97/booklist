const BootstrapButton = require('/react-redux/applicationRoot/rootComponents/bootstrapButton');
const Modal = ReactBootstrap.Modal;
const HierarchicalSubjectList = require('./hierarchicalSubjectList');

const hashUtil = require('/utils/hashManager');

const BookSearchDesktop = require('./BookSearch-desktop');
const BookSubjectSetterDesktop = require('./BookSubjectSetter-desktop');

class BookViewListDesktop extends React.Component{
    constructor(props){
        super();

        this.hashManager = new hashUtil();
        this.state = { booksSubjectsModalShown: false, editSubjectsFor: [], subjectsAdding: [], subjectsRemoving: [], editingSubject: null };
    }
    componentWillMount(){
        this.props.setSearchFilterText(this.hashManager.getCurrentHashValueOf('bookSearch') || '');
    }
    render(){
        return (
            <div>
                <BookSearchDesktop
                    searchFilters={this.props.filters}
                    searchText={'foo'}
                    allSubjects={this.props.subjects.list}
                    setFilteredSubjects={this.props.setFilteredSubjects}
                    setSearchText={this.props.setSearchFilterText}></BookSearchDesktop>
                <br />
                <BootstrapButton preset="primary-sm" onClick={this.props.enableSubjectModificationToggledBooks}>Set subjects</BootstrapButton>
                &nbsp;&nbsp;&nbsp;
                <BootstrapButton preset="primary-sm" onClick={this.props.editSubjects}>Edit subjects</BootstrapButton>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>&nbsp;&nbsp;&nbsp;&nbsp;</th>
                            <th></th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Genres</th>
                            <th>ISBN</th>
                            <th>Published</th>
                            <th>Pages</th>
                        </tr>
                    </thead>
                    <tbody>
                    { this.props.books.list.map(book =>
                        <tr key={book._id}>
                            <td>
                                <i onClick={() => this.props.toggleSelectBook(book._id)} className={'fa ' + (this.props.books.selectedBooks[book._id] ? 'fa-check-square-o' : 'fa-square-o')} style={{ cursor: 'pointer' }}></i>
                            </td>
                            <td><img src={book.smallImage} /></td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>
                                { book.subjectObjects.map(s => <li key={s._id}>{s.name}</li>) }
                                <button onClick={() => this.props.enableSubjectModificationSingleBook(book._id)}>Open</button>
                            </td>
                            <td>{book.isbn}</td>
                            <td>{book.publicationDate}</td>
                            <td>{book.pages}</td>
                        </tr>
                    )}
                    </tbody>
                </table>

                <BookSubjectSetterDesktop
                    booksSubjectsModifier={this.props.booksSubjectsModifier}
                    subjects={this.props.subjects}
                    subjectModificationClearSubjects={this.props.subjectModificationClearSubjects}
                    toggleSubjectModificationAdd={this.props.toggleSubjectModificationAdd}
                    toggleSubjectModificationRemove={this.props.toggleSubjectModificationRemove}
                    setBooksSubjects={this.props.setBooksSubjects}
                    cancelBookSubjectModification={this.props.cancelBookSubjectModification}>
                </BookSubjectSetterDesktop>

                <Modal show={!!this.props.subjects.editSubjectsPacket} onHide={this.props.stopEditingSubjects}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Edit subjects
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <HierarchicalSubjectList subjects={this.props.subjects.list} onEdit={_id => this.props.editSubject(_id)} />

                        { this.props.subjects.editSubjectsPacket && this.props.subjects.editSubjectsPacket.editingSubject ?
                            <div>
                                { this.props.subjects.editSubjectsPacket.editingSubject._id ? `Edit subject ${this.props.subjects.editSubjectsPacket.editingSubject.name}` : 'New Subject' }
                                <br/>
                                New name: <input value={this.props.subjects.editSubjectsPacket.newSubjectName} onChange={(e) => this.props.setNewSubjectName(e.target.value)} />
                                New Parent:
                                <select value={this.props.subjects.editSubjectsPacket.newSubjectParent} onChange={(e) => this.props.setNewSubjectParent(e.target.value)}>
                                    <option value="">None</option>
                                    { this.props.subjects.editSubjectsPacket.eligibleParents.map(s => <option key={s._id} value={s._id}>{s.name}</option>) }
                                </select>
                                <BootstrapButton onClick={this.props.updateSubject}>Save</BootstrapButton>
                            </div>
                            : null
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={this.props.stopEditingSubjects}>Close</button>
                    </Modal.Footer>
                </Modal>                
            </div>
        );
    }
}

module.exports = BookViewListDesktop;