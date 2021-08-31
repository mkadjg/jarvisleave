package org.jarvis.leave.repository;

import org.jarvis.leave.model.StatusCuti;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StatusCutiRepository extends JpaRepository<StatusCuti, Integer> {

    @Override
    @Query("select u from StatusCuti u where u.isDeleted=false")
    List<StatusCuti> findAll();
}
