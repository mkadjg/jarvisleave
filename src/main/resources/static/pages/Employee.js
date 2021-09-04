import {useEffect, useState} from '../modules/react.js';
import {
    Button,
    CircularProgress,
    IconButton, Paper, Snackbar, Stack,
    Table,
    TableBody,
    TableCell, TableContainer,
    TableHead,
    TableRow, Typography
} from '../modules/material-ui.js';
import html from '../modules/htm.js';
import MaterialIcon from "../components/MaterialIcon.js"

function Employee() {
    const [employees, setEmployees] = useState();
    const [deleteOpen, setDeleteOpen] = useState();
    const [deleted, setDeleted] = useState();
    const [deletedIndex, setDeletedIndex] = useState();

    useEffect(() => {
        fetch('/api/employee')
            .then(response => response.json())
            .then(employees => {
                setEmployees(employees);
            });
    }, []);

    const del = (id) => {
        fetch('/api/employee/' + id, {
            method: 'DELETE'
        }).then(() => {
            setDeleted(employees.find(employee => employee.id === id));
            setDeletedIndex(employees.findIndex(employee => employee.id === id));
            setEmployees(employees.filter(employee => employee.id !== id));
            setDeleteOpen(true);
        });
    };

    const cancelDelete = () => {
        setEmployees([...employees.slice(0, deletedIndex), deleted, ...employees.slice(deletedIndex)]);
        setDeleted(null);
        setDeletedIndex(null);
        setDeleteOpen(false);
    };

    return html`
        <${Stack} p=${2} spacing=${2}>
            <${Typography} variant="h4">
                Karyawan
            <//>
            <${TableContainer} component=${Paper}>
                <${Table}>
                    <${TableHead}>
                        <${TableRow}>
                            <${TableCell}>NIP<//>
                            <${TableCell}>Nama<//>
                            <${TableCell}>Divisi<//>
                            <${TableCell}>Email<//>
                            <${TableCell}>Nama pengguna<//>
                            <${TableCell}>Role<//>
                            <${TableCell}><//>
                        <//>
                    <//>
                    <${TableBody}>
                    ${employees ? employees.map(employee => html`
                        <${TableRow}>
                            <${TableCell}>${employee.nip}<//>
                            <${TableCell}>${employee.nama}<//>
                            <${TableCell}>${employee.divisi.nama}<//>
                            <${TableCell}>${employee.email}<//>
                            <${TableCell}>${employee.username}<//>
                            <${TableCell}>${employee.role.nama}<//>
                            <${TableCell}>
                                <${Stack} direction="row" spacing=${2}>
                                    <${IconButton}>
                                        <${MaterialIcon}>edit<//>
                                    <//>
                                    <${IconButton} onClick=${() => del(employee.id)}>
                                        <${MaterialIcon}>delete<//>
                                    <//>
                                <//>
                            <//>
                        <//>
                    `) : html`<${CircularProgress} />`}
                    <//>
                <//>
            <//>
        <//>
        <${Snackbar}
                open=${deleteOpen}
                autoHideDuration=${10000}
                onClose=${() => setDeleteOpen(false)}
                message="1 karyawan dihapus."
                action=${html`
                    <${Button} size="small" onClick=${cancelDelete}>Batal<//>
                    <${IconButton}
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick=${() => setDeleteOpen(false)}
                    >
                        <${MaterialIcon} size="small" >close<//>
                    <//>
                `}
        />
    `;
}

export default Employee;